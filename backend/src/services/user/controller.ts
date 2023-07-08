import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";
const bcrypt = require("bcryptjs");
const path = require("path");
const UserModel = require("../../models/user");
const baseDir = path.resolve(__dirname, "../../..");

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
      var profileImage;
      const { email, name, password, imageChange } = req.body;
      if(imageChange == "true"){
        profileImage  = req.files.profileImage;
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
        try {
          if (profileImage != null) {
            var extension_type = path.extname(profileImage.name);
            const acceptableExtensions = [".png", ".jpg", ".jpeg"];
            if (!acceptableExtensions.includes(extension_type)) {
              return res
                .status(400)
                .json({ error: "Only .png, .jpg and .jpeg format allowed!" });
            }
            imagePath =
              req.protocol +
              "://" +
              req.get("host") +
              "/images/user_profile/" +
              Date.now() +
              "--" +
              profileImage.name
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

          res
            .status(200)
            .send({ message: "Success", data: { ...currentUser } });
        } catch (error) {
          res
            .status(400)
            .json({ error: "Update fail, please try again later" });
        }
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
