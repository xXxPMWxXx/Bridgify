import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ElderlyModel = require("../../models/elderly");
const UserModel = require("../../models/user");
const FaceModel = require('../../models/face');
const NotificationModel = require("../../models/notification");

const getDateTime = require("../../services/utils/getDateTime");


const jwt_secret: any = process.env.JWT_SECRET;

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
function arraysAreEqual(arr1: any[], arr2: string | any[]) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}

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
      const updateStatus = req.body.status;
      if (decoded) {
        // 4. check if the email is existed
        const elderly = await ElderlyModel.findOne({ id: id });
        if (elderly == null) {
          return res
            .status(400)
            .json({ message: `Elderly ID: ${id} does not exit!` });
        }
        try {
          //compare original db data with incoming request body
          //and check for the difference (for notification) 
          const originalData = await ElderlyModel.findOne({ id: id });
          const originalStatus = originalData.status;

          const differences: { [key: string]: { old: any; new: any } } = {};
          for (const key in updateStatus) {
            if (key == "medication") {
              if ((!arraysAreEqual(originalStatus[key], updateStatus[key]))) {
                differences[key] = {
                  old: originalStatus[key],
                  new: updateStatus[key]
                };
              }
            } else {
              //if there is a difference
              if (originalStatus[key] !== updateStatus[key]) {
                differences[key] = {
                  old: originalStatus[key],
                  new: updateStatus[key]
                };
              }
            }
          }

          //create new notifications
          const notificationList: any[] = [];

          await ElderlyModel.updateOne({ id: id }, req.body)
            .then((updateResp: any) => {
              for (const key in differences) {
                let newNotification;
                if(key =="medication"){
                  const medicationStr = differences[key]['new'].join(", ");
                  newNotification = new NotificationModel({ "elderlyID": id, "message": `'s ${key} has been updated to "${medicationStr}".`, "date": getDateTime.now() })

                } else{
                  const keyEdited = key.replace("_"," ");
                  newNotification = new NotificationModel({ "elderlyID": id, "message": `'s ${keyEdited} has been updated to "${differences[key]['new']}".`, "date": getDateTime.now() })

                }

                notificationList.push(
                  newNotification.save().catch((error: any) => {
                    console.log(error);
                    // Handle the error, maybe log it
                  })
                );
              }

              return Promise.all(notificationList);
            })
            .then(() => {
              // This block will run when all notifications have been successfully saved
              return res.status(200).send({
                message: `Elderly ID : ${id} updated successfully`,     
                message2: `Notifications for ${id} created successfully`,
                differences
              });
            })
            .catch((error: any) => {
              // Handle errors from update or notification saving
              console.error(error);
              return res.status(500).json({ error: "An error occurred while updating and creating notifications." });
            });
        } catch (error) {
          return res.status(400).json({ error: "Update fail, please try again later" });
        }

      }else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    })
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
          //remove from Face and Elderly table
          await FaceModel.deleteOne({ label: `${elderly.name}(${id})` });
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

        const elderly = await ElderlyModel.find({ 'id': { $in: linkedElderly } })
        res.status(200).json(elderly);

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    });

  } catch (error) {
    res.status(400).json({ error, message: "Make sure your request body is correct" });
  }
};