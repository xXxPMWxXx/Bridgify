import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";
const bcrypt = require("bcryptjs");
const path = require("path");
const UserModel = require("../../models/user");
const ElderlyModel = require("../../models/elderly");
const baseDir = path.resolve(__dirname, "../../..");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
var fs = require('fs');

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "bridgifyteam@hotmail.com",
    pass: "Bridgify123",
  },
  debug: true, // show debug output
  logger: true, // log information in console
  // tls: {
  //     rejectUnauthorized: false
  // }
});

const jwt_secret: any = process.env.JWT_SECRET;

export const test = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow user to get all users from mongodb
      if (decoded) {
        const allUsers = await UserModel.collection.find().toArray();
        res.status(200).send(allUsers);
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

export const signup = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    // 1. check if the email is existed
    const user = await UserModel.findOne({ email: email });
    if (user != null) {
      return res
        .status(400)
        .json({ message: `Email: ${email} was already register` });
    }
    // 2. get user from the frontend
    const newUser = new UserModel(req.body);
    console.log(newUser);
    // 3. hash password
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    // 4. add a new user to mongodb
    newUser
      .save()
      .then((response: any) => {
        return res.status(200).send({
          message: `Email : ${email} register successfully`,
          data: response,
        });
      })
      .catch((error: any) => {
        return next(error);
      });
  } catch (error) {
    res
      .status(400)
      .json({ error, message: "Make sure your request body is correct" });
  }

  // UserModel.collection.insertOne({
  //   email: email,
  //   password: hashedPassword,
  // });

  // // 5. send status back to requestor
  // return res
  //   .status(200)
  //   .json({ message: `Email : ${email} register successfully` });
};

export const login = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // 1. find the user
    const user = await UserModel.collection.findOne({ email: email });

    if (user != null) {
      // 2. compare the password from req vs password in db - Authenticated ok
      const userAllowed = await bcrypt.compare(password, user.password);
      if (userAllowed) {
        // 3. create jwt token = Authorization
        const accessToken = jwt.sign({ data: email }, jwt_secret, {
          expiresIn: "1d",
        });
        const results = { ...user, accessToken };
        // 4. send JWT token to frontend requestor
        res.status(200).send({ message: "Success", data: results });
      } else {
        res.status(400).send({ message: "No user found or invalid password" });
      }
    } else {
      res.status(400).send({ message: "No user found or invalid password" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error, message: "Make sure your request body is correct" });
  }
};

// get all users
export const getall = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow user to get all users from mongodb
      if (decoded) {
        const allUsers = await UserModel.find();
        res.status(200).send(allUsers);
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

export const userProfile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  res.status(401).json({ message: "Authorized User!!" });
};

export const updateUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. update user details based on email
      //imageChange required to indicate update of profile or not
      var profileImage;
      const { email, name, password, imageChange } = req.body;
      if (imageChange == "true") {
        profileImage = req.files.profileImage;
      }
      if (decoded) {
        // 4. check if valid user email
        const user = await UserModel.collection.findOne({ email: email });
        if (user == null) {
          return res
            .status(400)
            .json({ message: `User email: ${email} does not exit!` });
        }
        var imagePath = "";
        // try {
        if (profileImage != null) {
          var extension_type = path.extname(profileImage.name);
          const acceptableExtensions = [".png", ".jpg", ".jpeg"];
          if (!acceptableExtensions.includes(extension_type)) {
            return res
              .status(400)
              .json({ error: "Only .png, .jpg and .jpeg format allowed!" });
          }
          imagePath =
            // "http://13.228.86.148:8000/images/user_profile/" +
            Date.now() +
            "--" +
            profileImage.name;
          profileImage.mv(
            baseDir +
            "/images/user_profile/" +
            Date.now() +
            "--" +
            profileImage.name
          );
          console.log(imagePath);
        }

        //handle instance where password isnt changed
        if (password == "" || password == null) {
          await UserModel.updateOne(
            { email: email },
            { profileImage: imagePath, name: name }
          );
        } else {
          // 5. hash password if user exists
          const hashedPassword = await bcrypt.hash(password, 10);
          await UserModel.updateOne(
            { email: email },
            { profileImage: imagePath, name: name, password: hashedPassword }
          );
        }

        // get current user details with new access token
        const currentUser = await UserModel.collection.findOne({
          email: email,
        });

        res.status(200).send({ message: "Success", data: { ...currentUser } });
        // } catch (error) {
        //   res
        //     .status(400)
        //     .json({ error: "Update fail, please try again later" });
        // }
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

let OTP = "0000";
export async function generateOTP(req: any, res: Response) {
  try {
    const { email } = req.body;
    // 1. check if there is such user
    const user = await UserModel.collection.findOne({ email: email });

    if (user != null) {
      OTP = await otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
      console.log(OTP);

      //contents of the email
      const info = await transporter.sendMail({
        from: '"Bridgify Team" <bridgifyteam@hotmail.com>', // sender address
        to: email, // receiver
        subject: "Bridgify: Password Recovery", // Subject line
        html:
          "<p>Dear customer,</p><p>We have received a request to reset your Bridgify Account password.</p><p>Your OTP is: <b>" +
          OTP +
          "</b></p><p>Yours Sincerely,<br>Bridgify Team",
      });

      res
        .status(200)
        .send({ message: "Success, OTP sent to " + email, OTP: OTP });
    } else {
      res.status(400).send({ message: "No such user" });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
}

export async function verifyOTP(req: any, res: Response) {
  try {
    const { code } = req.body;

    if (OTP == code) {
      res.status(200).send({ message: "Success" });
    } else {
      res.status(400).send({ error: "Please key in valid code" });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
}

//reset password
export const reset = async (req: any, res: Response, next: NextFunction) => {
  try {
    //check if email exists
    const { email, newpassword } = req.body;

    const user = await UserModel.collection.findOne({ email });

    if (user == null) {
      return res
        .status(400)
        .json({ message: `User email: ${email} does not exit!` });
    }
    //hash password and update it in database
    const hashedPassword = await bcrypt.hash(newpassword, 10);

    try {
      await UserModel.updateOne({ email: email }, { password: hashedPassword });
      res
        .status(200)
        .send({
          message: `User email: ${email} password updated successfully`,
        });
    } catch (error) {
      res.status(400).json({ error: "Update fail, please try again later" });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const linkElderly = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      if (decoded) {
        const data = req.body;
        const email = data.email;
        const elderlyID = data.elderlyID;
        const user = await UserModel.findOne({ email });
        //Notes: the name need match with the DB field name
        const elderly = await ElderlyModel.findOne({ id: elderlyID });
        const linkedElderly = user.linkedElderly;

        if (user == null) {
          return res
            .status(400)
            .json({ message: `User Email: ${email} does not exist!` });
        }
        if (elderly == null) {
          return res
            .status(400)
            .json({ message: `Elderly ID: ${elderlyID} does not exist!` });
        }

        if (linkedElderly.length >= 4) {
          return res
            .status(400)
            .json({
              message: `User Email: ${email} already linked to 4 elderly!`,
            });
        }
        if (linkedElderly.includes(elderlyID) == true) {
          return res
            .status(400)
            .json({
              message: `User Email: ${email} already linked to Elderly ID: ${elderlyID}!`,
            });
        }

        user.linkedElderly.push(elderlyID);
        user.save().then(
          res.status(200).send({
            message: `Elderly: ${elderlyID} linked to user: ${email} successfully`,
            linkElderly: user.linkedElderly,
          })
        );
      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const removeLinkElderly = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      if (decoded) {
        const data = req.body;
        const email = data.email;
        const elderlyID = data.elderlyID;
        const user = await UserModel.findOne({ email });
        const elderly = await ElderlyModel.findOne({ id: elderlyID });
        const linkedElderly = user.linkedElderly;

        if (user == null) {
          return res
            .status(400)
            .json({ message: `User Email: ${email} does not exist!` });
        }
        if (elderly == null) {
          return res
            .status(400)
            .json({ message: `Elderly ID: ${elderlyID} does not exist!` });
        }
        if (linkedElderly.includes(elderlyID) != true) {
          return res
            .status(400)
            .json({
              message: `User Email: ${email} does not linked to Elderly ID: ${elderlyID}!`,
            });
        }

        user.linkedElderly.pull(elderlyID);
        console.log(user.linkedElderly);
        user.save().then(
          res.status(200).send({
            message: `Elderly: ${elderlyID} removed from user: ${email} successfully`,
            linkElderly: user.linkedElderly,
          })
        );
      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });
  } catch (error) {
    res.status(400).send({ error });
  }
};

// get user post, find by author email and date created
export const delete_user = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow admin to update post details
      if (decoded) {
        const { email } = req.body;
        // 4. check if the user is existed
        const user = await UserModel.findOne({ 'email': email });

        if(user.accRole == 'Admin') {
          return res
          .status(400)
          .json({ message: `You cannot delete admin account!` });
        }

        const imageName = user.profileImage;
        const image = `${baseDir}/images/user_profile/${imageName}`;
        if (imageName!='default.png' && fs.existsSync(image)) {
          fs.unlink(image, (err: any) => {
            if (err) {
              console.log(err);
            }
            console.log(`${imageName} deleted`);
          })
        } else {
          console.log(`${imageName} does not exist/cannot be deleted!`);
        }

        if (user == null) {
          return res
            .status(400)
            .json({ message: `User does not exit!` });
        }
        try {
          await UserModel.deleteOne({ 'email': email });
          res.status(200).send({ message: `User delete successfully` });
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