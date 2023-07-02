import express from 'express';
import * as controller from './controller';
const multer = require('multer');

export const nftRouter = express.Router();

const path = require("path");
//Checking the file type
const checkFileType = function (file: any, cb: any) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images(jpeg, jpg, png)!!");
    }
};


//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: "./images",
    filename: (req: any, file: any, cb: any) => {
        // cb(null, `${getCurrentData()}--${file.originalname}`);
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 10000000 },
    fileFilter: (req : any, file : any, cb : any) => {
        checkFileType(file, cb);
    },
});

//for uploading file
nftRouter.post("/uploadImage", upload.single("image"), controller.uploadImage);
