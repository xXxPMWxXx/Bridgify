import { NextFunction, Request, Response } from 'express';
const multer = require('multer');

var fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req: any, file: any, callback: any) {
        callback(null, './uploads');
    },
    filename: function (req: any, file: any, callback: any) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage }).single('userPhoto');


export const uploadImage = (req: Request, res: Response, next: NextFunction) => {
   
    return res.status(200).json({ Message: 'Image uploaded successfully.' });

};
export const createNFTMetadata = (req: Request, res: Response, next: NextFunction) => {
    fs.writeFile(`Metadata/${req.body.fileName}`, JSON.stringify(req.body), function (err: any) {
        if (err) {
            return res.status(400).json({ error: err });
        }

    });
    return res.status(200).json({ Message: 'File created successfully.' });
};

//http://localhost:8000/api/nft/getMetadata/?fileName={filename}
export const getMetadata = (req: Request, res: Response, next: NextFunction) => {

    fs.readFile(`Metadata/${req.query.fileName}`, 'utf8', (err: any, data: any) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        return res.status(200).json(JSON.parse(data));

    });

};




