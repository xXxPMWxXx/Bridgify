import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";
const bcrypt = require("bcryptjs");
const NotificationModel = require("../../models/notification");

const jwt_secret: any = process.env.JWT_SECRET;

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
      res.status(200).json({ message: "test method from notification controller" });

    } else if (err) {
      res.status(401).json({ error: "You must have a valid token" });
    }
  });

};