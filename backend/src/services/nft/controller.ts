import { NextFunction, Request, Response } from 'express';

const multer = require('multer');
var fs = require('fs');

export const uploadImage = (req: Request, res: Response, next: NextFunction) => {

    return res.status(200).json({ Message: 'Image uploaded successfully.' });

};









