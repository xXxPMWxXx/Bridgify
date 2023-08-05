import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";
const bcrypt = require("bcryptjs");
const NotificationModel = require("../../models/notification");

const jwt_secret: any = process.env.JWT_SECRET;

const getDateTime = require("../../services/utils/getDateTime");


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

export const create = async (req: any, res: any, next: NextFunction) => {

  // 1. get token from req
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // 2. verify token with secret key
  jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
    // 3. create notification
    if (decoded) {

      const { elderlyID, message } = req.body;
      
      //create the DB object
      const newNotification = new NotificationModel({
        "elderlyID": elderlyID,
        "message": message,
        "date": getDateTime.now()
      });

      // add a new record to mongodb
      newNotification
        .save()
        .then((response: any) => {
          return res.status(200).send({
            message: `Notification created successfully`
          });
        })
        .catch((error: any) => {
          return next(error);
        });

    } else if (err) {
      res.status(401).json({ error: "You must have a valid token" });
    }
  });

};

// to get all notifications for the linked elderly for user side
export const getLinked = async (req: any, res: any, next: NextFunction) => {

  // 1. get token from req
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // 2. verify token with secret key
  jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
    try {
      if (decoded) {
        const data = req.body;
        const strlinkedElderly = data.linkedElderly;
        const linkedElderly = strlinkedElderly.split(',')
        const results: any[] = [];

        // Using map to create an array of promises
        const promises = linkedElderly.map(async (id: any) => {
          const notifications = await NotificationModel.find({ elderlyID: id });
          // console.log(records)
          return notifications;
        });

        // Wait for all promises to resolve using Promise.all
        const resolvedResults = await Promise.all(promises);
        resolvedResults.forEach((element: any) =>
          element.forEach((e: any) =>
            results.push(e)
          )
        )
        
        // console.log(resolvedResults);
        results.sort((a, b) => b.date.localeCompare(a.date));


        res.status(200).json(results);

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
    }
  });
};