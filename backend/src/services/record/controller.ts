import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

const bcrypt = require("bcryptjs");
const RecordModel = require("../../models/record");

const jwt_secret: any = process.env.JWT_SECRET;

const path = require('path');
const baseDir = path.resolve(__dirname, "../../..");
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
      res.status(200).json({ message: "test method from record controller" });

    } else if (err) {
      res.status(401).json({ error: "You must have a valid token" });
    }
  });

};

// to create a new record
export const create = async (req: any, res: any, next: NextFunction) => {

  // 1. get token from req
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // 2. verify token with secret key
  jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
    try {
      if (decoded) {
        const data = req.body;
        const file = req.files.doc;

        //only accepts one file
        const fileName = `${data.elderlyID}_${data.name}_${data.document_no}` + path.extname(file.name);
        file.mv(baseDir + `/records/${fileName}`);

        //create the DB object
        const newRecord = new RecordModel({
          "elderlyID": data.elderlyID,
          "type": data.type,
          "dateTime": getDateTime.now(),
          "name": data.name,
          "document_no": data.document_no,
          "document_path": fileName
        });

        // add a new record to mongodb
        newRecord
          .save()
          .then((response: any) => {
            return res.status(200).send({
              message: `Record ${data.document_no} created successfully`
            });
          })
          .catch((error: any) => {
            return next(error);
          });


      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }

    } catch (error) {
      return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
    }
  });
};

// // to update a record
// export const update = async (req: any, res: any, next: NextFunction) => {

//   // 1. get token from req
//   const token =
//     req.headers.authorization && req.headers.authorization.split(" ")[1];

//   // 2. verify token with secret key
//   jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
//     try {
//       if (decoded) {
//         const {elderlyID, document_no} = req.body;

//       } else if (err) {
//         res.status(401).json({ error: "You must have a valid token" });
//       }
//     } catch (error) {
//       return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
//     }
//   });
// };


// to delete a new post
// export const deleteRecord = async (req: any, res: any, next: NextFunction) => {

//   // 1. get token from req
//   const token =
//     req.headers.authorization && req.headers.authorization.split(" ")[1];

//   // 2. verify token with secret key
//   jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
//     try {
//       if (decoded) {
//         const data = req.body;

//         const record = await RecordModel.findOne({ document_no: id });
//       }else if (err) {
//   res.status(401).json({ error: "You must have a valid token" });
// }
//     } catch (error) {
//       return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
//     }
//   });
// };

// to display document
export const display = async (req: any, res: any, next: NextFunction) => {

  // 1. get token from req
  // const token =
  //   req.headers.authorization && req.headers.authorization.split(" ")[1];
  try {

    const data = req.query;
    const fileName = data.fileName;
    res.sendFile(baseDir + `/records/${fileName}`);
    // res.status(200).json({ message: "File sent successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
  }


  // 2. verify token with secret key
  // jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
  //   try {
  //     if (decoded) {
  //       const data = req.query;
  //       const fileName = data.fileName;
  //       res.sendFile(baseDir + `/records/${fileName}`);
  //     } else if (err) {
  //       res.status(401).json({ error: "You must have a valid token" });
  //     }
  //   } catch (error) {
  //     return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
  //   }
  // });
};

// to get all records for one specific elderly for user side
export const getSelected = async (req: any, res: any, next: NextFunction) => {

  // 1. get token from req
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // 2. verify token with secret key
  jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
    try {
      if (decoded) {
        const data = req.query;
        console.log(data.elderlyID);
        const records = await RecordModel.find({ elderlyID: data.elderlyID });
        res.status(200).json({ records });

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
    }
  });
};


// to get all records for admin
export const getAll = async (req: any, res: any, next: NextFunction) => {

  // 1. get token from req
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  // 2. verify token with secret key
  jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
    try {
      if (decoded) {
        const allRecords = await RecordModel.find({});
        res.status(200).json(allRecords);

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
    }
  });
};




