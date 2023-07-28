import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const jwt_secret: any = process.env.JWT_SECRET;
const faceService = require("../../services/utils/faceService");
const getDateTime = require("../../services/utils/getDateTime");
const path = require("path");
const baseDir = path.resolve(__dirname, "../../..");
const PostModel = require("../../models/post");
const UserModel = require("../../models/user");
const ElderlyModel = require("../../models/elderly");
var fs = require('fs');

// to create a new post
//to access the image => http://13.228.86.148:8000/images/post/{imageName}
//http://13.228.86.148:8000/images/post/admin@gmail.com_2023-07-10T15:14:54_1.png
export const create = async (req: any, res: any, next: NextFunction) => {
  // 1. get token from req
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // 2. verify token with secret key
  jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
    try {
      if (decoded) {
        // 3. allow elderly to update elderly details
        const { author_email, description, activity_type } = req.body;
        const { images } = req.files;
        //store in DB as String
        const dateTime = getDateTime.now();
        //variable to store into DB
        var elderlyInvolved: String[] = [];
        var postImages: String[] = [];
        var imagesCount = 0;
        var devImageURL: String[] = [];
        var imageURL: String[] = [];

        // for one image
        if (images.name != undefined) {
          let results = await faceService.getDescriptorsFromDB(images.data);

          results.forEach((element: any) => {
            const label = element["_label"];
            //push known label to the faceFound
            if (label != "unknown" && !elderlyInvolved.includes(label)) {
              elderlyInvolved.push(label);
            }
          });
          imagesCount++;
          //store each of the image to images/post folder name format => email_date_imageCount.png
          //Notes : FE pass in the date as the datetime, not only the date
          const imageName = `${author_email}_${dateTime}_${imagesCount}.png`;
          images.mv(baseDir + `/images/post/${imageName}`);
          postImages.push(imageName);
          imageURL.push(`http://13.228.86.148:8000/images/post/${imageName}`);
          devImageURL.push(`http://localhost:8000/images/post/${imageName}`);
        }

        // max 10 images
        for (let i = 0; i < 10; i++) {
          //if no more image, break the loop
          if (images[i] == undefined) {
            break;
          }

          imagesCount++;
          // this will return an array
          let results = await faceService.getDescriptorsFromDB(images[i].data);

          results.forEach((element: any) => {
            const label = element["_label"];
            //push known label to the faceFound
            if (label != "unknown" && !elderlyInvolved.includes(label)) {
              elderlyInvolved.push(label);
            }
          });
          //store each of the image to images/post folder name format => email_date_imageCount.png
          //Notes : FE pass in the date as the datetime, not only the date
          const imageName = `${author_email}_${dateTime.replace(':','-')}_${imagesCount}.png`;
          images[i].mv(baseDir + `/images/post/${imageName}`);
          postImages.push(imageName);
          imageURL.push(`http://13.228.86.148:8000/images/post/${imageName}`);
          devImageURL.push(`http://localhost:8000/images/post/${imageName}`);
        }

        //create the DB object
        const newPost = new PostModel({
          author_email: author_email,
          dateTime: dateTime,
          description: description,
          activity_type: activity_type,
          postImages: postImages,
          elderlyInvolved: elderlyInvolved,
          imagesCount: imagesCount,
        });

        // add a new post to mongodb
        newPost
          .save()
          .then((response: any) => {
            return res.status(200).send({
              message: `Post created successfully`,
              elderlyInvolved: JSON.stringify(elderlyInvolved),
              imageURL: imageURL,
              devImageURL: devImageURL,
            });
          })
          .catch((error: any) => {
            return next(error);
          });
      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    } catch (error) {
      return res
        .status(400)
        .json({
          message: "Please make sure the input file is valid type",
          error: String(error),
        });
    }
  });
};

// get all post
export const getAll = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      if (decoded) {
        // 4. check if the email is existed
        const allPost = await PostModel.find({});
        res.status(200).json({ message: "Success", data: allPost });
      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: "Make sure your request body is correct" });
  }
};

// get a list of post by user email 
export const getByUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow elderly to update elderly details

      if (decoded) {
        const email = req.query.email;
        // 4. check if the user email is existed
        const user = await UserModel.findOne({ 'email': email });
        if (user == null) {
          return res
            .status(400)
            .json({ message: `User email: ${email} does not exit!` });
        }
        const linkedElderly = user.linkedElderly;
        //if no linked elderly
        if (linkedElderly.length == 0) {
          return res
            .status(200)
            .json({ message: `User email: ${email} is not linked to any elderly yet!` });
        }
        let linkedElderlyNameList: any = [];
        //map linked elderly ID to their name
        for (const elderlyID of linkedElderly) {
          const elderlyName = await ElderlyModel.findOne({ id: elderlyID }).select('name');
          linkedElderlyNameList.push(elderlyName.name);
        };
        const post = await PostModel.find({ 'elderlyInvolved': { $in: linkedElderlyNameList } })
        res.status(200).json(post);

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });

  } catch (error) {
    res.status(400).json({ error, message: "Make sure your request body is correct" });
  }
};

// get all the post with no elderly identified
export const getNonElderlyInvolved = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow elderly to update elderly details

      if (decoded) {
        const post = await PostModel.find({ 'elderlyInvolved': [] })
        res.status(200).json(post);

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });

  } catch (error) {
    res.status(400).json({ error, message: "Make sure your request body is correct" });
  }
};

// get update post, find by author email and date created
export const update = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow admin to update post details
      if (decoded) {
        const { author_email, dateTime } = req.body;
        // 4. check if the post is existed
        const post = await PostModel.findOne({ 'author_email': author_email, 'dateTime': dateTime });
        if (post == null) {
          return res
            .status(400)
            .json({ message: `Post does not exit!` });
        }
        try {
          await PostModel.updateOne({ 'author_email': author_email, 'dateTime': dateTime }, req.body);
          res.status(200).send({ message: `Post updated successfully` });
        } catch (error) {
          res.status(400).json({ error: "Update fail, please try again later" });
        }

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });

  } catch (error) {
    res.status(400).json({ error, message: "Make sure your request body is correct" });
  }

};

// get update post, find by author email and date created
export const delete_post = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow admin to update post details
      if (decoded) {
        const { author_email, dateTime } = req.body;
        // 4. check if the post is existed
        const post = await PostModel.findOne({ 'author_email': author_email, 'dateTime': dateTime });
        const images = post.postImages;

        images.forEach((img: any) => {
          const image = `${baseDir}/images/post/${img}`;
          if (fs.existsSync(image)) {
            fs.unlink(image, (err: any) => {
              if (err) {
                console.log(err);
              }
              console.log(`${img} deleted`);
            })
          }else {
            console.log(`${img} does not exist!`);
          }
        });

        if (post == null) {
          return res
            .status(400)
            .json({ message: `Post does not exit!` });
        }
        try {
          await PostModel.deleteOne({ 'author_email':  author_email, 'dateTime': dateTime});
          res.status(200).send({ message: `Post delete successfully` });
        } catch (error) {
          res.status(400).json({ error: "Delete fail, please try again later" });
        }

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });

  } catch (error) {
    res.status(400).json({ error, message: "Make sure your request body is correct" });
  }

};
