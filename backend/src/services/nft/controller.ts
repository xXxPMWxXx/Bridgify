import { NextFunction, Request, Response } from 'express';

const multer = require('multer');
var fs = require('fs');
var path = require('path');

const baseDir = path.resolve(__dirname, "../../..");

export const uploadImage = (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({ Message: 'Image uploaded successfully.' });

};


export const test = async (req: any, res: any, next: NextFunction) => {
    const { file } = req.files;

    // If no image submitted, exit
    console.log(__dirname);
    console.log(baseDir);
    // Move the uploaded image to our upload folder
    file.mv(baseDir + '/images/' + file.name);

    return res.status(200).json({ Message: 'Image uploaded successfully.' });

};






