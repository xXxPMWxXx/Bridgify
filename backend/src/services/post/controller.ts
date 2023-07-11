import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

const bcrypt = require("bcryptjs");
const PostModel = require("../../models/post");
const jwt_secret: any = process.env.JWT_SECRET;
const faceService = require("../../services/utils/faceService");
const getDateTime = require("../../services/utils/getDateTime");
const path = require("path");
const baseDir = path.resolve(__dirname, "../../..");

// // 1. get token from req
// const token =
// req.headers.authorization && req.headers.authorization.split(" ")[1];

// // 2. verify token with secret key
// jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
// // 3. allow elderly to update elderly details
// const { id } = req.body;
// if (decoded) {
//code here

// } else if (err) {
//   res.status(401).json({ error: "You must have a valid token" });
// }
// });

// for testing only
export const test = async (req: any, res: any, next: NextFunction) => {
  // 1. get token from req
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // 2. verify token with secret key
  jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
    // 3. allow elderly to update elderly details
    const { id } = req.body;
    if (decoded) {
      res.status(200).json({ message: "test method from post controller" });
    } else if (err) {
      res.status(401).json({ error: "You must have a valid token" });
    }
  });
};

// to create a new post
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
          const imagePath = req.protocol + '://' + req.get("host") + '/images/post/' + imageName;
          postImages.push(imagePath);
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
          const imageName = `${author_email}_${dateTime}_${imagesCount}.png`;
          images[i].mv(baseDir + `/images/post/${imageName}`);
          const imagePath = req.protocol + '://' + req.get("host") + '/images/post/' + imageName;
          postImages.push(imagePath);
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
