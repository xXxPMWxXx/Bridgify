import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";
const bcrypt = require("bcryptjs");
const ElderlyModel = require("../../models/elderly");
const UserModel = require("../../models/user");

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

// insert new elderly profile
export const insert = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow elderly to update elderly details
      const { id } = req.body;
      if (decoded) {
        const { id } = req.body;
        // 4. check if the email is existed
        const elderly = await ElderlyModel.findOne({ id: id });
        if (elderly != null) {
          return res
            .status(400)
            .json({ message: `Elderly ID: ${id} was already register` });
        }

        // 5. get elderly from the frontend
        const newElderly = new ElderlyModel(req.body);
        console.log(newElderly);

        // 6. add a new elderly to mongodb
        newElderly
          .save()
          .then((response: any) => {
            return res.status(200).send({
              message: `Elderly ID : ${id} register successfully`,
              // for testing only, dont need respond this for production
              data: response,
            });
          })
          .catch((error: any) => {
            return next(error);
          });

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });

  } catch (error) {
    res.status(400).json({ error, message: "Make sure your request body is correct" });
  }

};

// get update elderly profile
export const update = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow elderly to update elderly details
      const { id } = req.body;
      if (decoded) {
        // 4. check if the email is existed
        const elderly = await ElderlyModel.findOne({ id: id });
        if (elderly == null) {
          return res
            .status(400)
            .json({ message: `Elderly ID: ${id} does not exit!` });
        }
        try {
          await ElderlyModel.updateOne({ id: id }, req.body);
          res.status(200).send({ message: `Elderly ID : ${id} updated successfully` });
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

// delete elderly profile
export const delete_elderly = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow elderly to update elderly details

      const id = req.query.id;
      if (decoded) {
        // 4. check if the email is existed
        const elderly = await ElderlyModel.findOne({ id: id });
        if (elderly == null) {
          return res
            .status(400)
            .json({ message: `Elderly ID: ${id} does not exit!` });
        }
        try {
          await ElderlyModel.deleteOne({ id: id });
          res.status(200).send({ message: `Elderly ID : ${id} deleted successfully` });
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

// get elderly profile
export const get = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow elderly to update elderly details

      const id = req.query.id;
      if (decoded) {
        // 4. check if the email is existed
        const elderly = await ElderlyModel.findOne({ id: id });
        if (elderly == null) {
          return res
            .status(400)
            .json({ message: `Elderly ID: ${id} does not exit!` });
        }
        res.status(200).json(elderly);

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });

  } catch (error) {
    res.status(400).json({ error, message: "Make sure your request body is correct" });
  }
};

// get all elderly profile
export const getAll = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {

      if (decoded) {
        // 4. check if the email is existed
        const allElderly = await ElderlyModel.find({});
        res.status(200).json(allElderly);

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });

  } catch (error) {
    res.status(400).json({ error, message: "Make sure your request body is correct" });
  }
};

// get a list of elderly profile link to a certain user
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
        //if not linked elderly
        if (linkedElderly.length == 0) {
          return res
            .status(200)
            .json({ message: `User email: ${email} is not linked to any elderly yet!` });
        }

        const elderly =  await ElderlyModel.find({'id' : {$in : linkedElderly}})
        console.log(linkedElderly);
        res.status(200).json(elderly);

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });

  } catch (error) {
    res.status(400).json({ error, message: "Make sure your request body is correct" });
  }
};


