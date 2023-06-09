import { NextFunction, Request, Response } from 'express';
// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
import '@tensorflow/tfjs-node';


// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData

const canvas = require('canvas');
const fileUpload = require("express-fileupload");

const path = require("path");

const tf = require("@tensorflow/tfjs-node");

const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");

const faceApiService = require("./faceApiService");



//testing SQLite using Sequelize
const test = async () => {

}
test();

//HTTP GET
//http://{endpoint}/api/customer/
export const forTest = async (req: Request, res: Response, next: NextFunction) => {
    test();
    return res.json("---");
};


export const upload = async (req: any, res: Response, next: NextFunction) => {
    console.log("---")
    const { file } = req.files;

    console.log(file);
    let result;
    try {
        result = await faceApiService.detect(file.data, file.name);
    } catch (error) {
        res.json(error);
    }

    res.json({
        detectedFaces: result.length,
        url: `http://localhost:8000/out/${file.name}`,
    });
};
