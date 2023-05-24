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

//return current date time as => YYYY-MM-DD HH:MM:SS
function getCurrentData() {
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    const currentTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return currentTime;
}

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


nftRouter.route('/createNFTMetadata').post(controller.createNFTMetadata);

nftRouter.route('/getMetadata').get(controller.getMetadata);

//for uploading file
nftRouter.post("/uploadImage", upload.single("image"), controller.uploadImage);