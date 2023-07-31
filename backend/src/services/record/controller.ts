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
var fs = require('fs');

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


// to delete a new record
// get update record, find by 
export const deleteRecord = async (req: any, res: Response, next: NextFunction) => {
  try {
    // 1. get token from req
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // 2. verify token with secret key
    jwt.verify(token, jwt_secret, async (err: any, decoded: any) => {
      // 3. allow admin to update post details
      if (decoded) {
        const { elderlyID, document_no } = req.body;
        // 4. check if the post is existed
        const record = await RecordModel.findOne({ 'elderlyID': elderlyID, 'document_no': document_no });
        if (record == null) {
          return res
            .status(400)
            .json({ message: `Record does not exit!` });

        } else {
          const filePath = record.document_path;

          const filePDF = `${baseDir}/records/${filePath}`;
          if (fs.existsSync(filePDF)) {
            fs.unlink(filePDF, (err: any) => {
              if (err) {
                console.log(err);
              }
              console.log(`${filePath} deleted`);
            })
          } else {
            console.log(`${filePath} does not exist!`);
          }
        }
        try {
          await RecordModel.deleteOne({ 'elderlyID': elderlyID, 'document_no': document_no });
          res.status(200).send({ message: `Record delete successfully` });
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
        console.log(records)
        res.status(200).json({ records });

      } else if (err) {
        res.status(401).json({ error: "You must have a valid token" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Please make sure the input file is valid type", error: String(error) });
    }
  });
};
// to get all records for the linked elderly for user side
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
          const records = await RecordModel.find({ elderlyID: id });
          // console.log(records)
          return records;
        });

        // Wait for all promises to resolve using Promise.all
        const resolvedResults = await Promise.all(promises);
        resolvedResults.forEach((element: any) =>
          element.forEach((e: any) =>
            results.push(e)
          )
        )
        // console.log(resolvedResults);

        res.status(200).json(results);

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




