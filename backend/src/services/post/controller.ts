import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

const bcrypt = require("bcryptjs");
const PostModel = require("../../models/post");
const path = require("path");
const baseDir = path.resolve(__dirname, "../../..");
const jwt_secret: any = process.env.JWT_SECRET;
const faceService = require("../../services/utils/faceService");

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
      // 3. allow elderly to update elderly details
      const { author_email, date, description, activity_type } = req.body;
      const { images } = req.files;

      console.log(author_email + date + description + activity_type);

      // max 10 images
      for (let i = 0; i < 10; i++) {
        if (images[i] != undefined) {
          let result = await faceService.getDescriptorsFromDB(images[i].data);
          console.log(result);
        }
      }

      if (decoded) {
        res.status(200).json({ message: "create method from post controller" });

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }

    } catch (error) {
      return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
    }
  });



};

