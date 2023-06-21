import { NextFunction, Request, Response } from 'express';
import '@tensorflow/tfjs-node';
const canvas = require('canvas');
const fileUpload = require("express-fileupload");
const path = require("path");
const tf = require("@tensorflow/tfjs-node");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const faceApiService = require("./faceApiService");
const mongoose = require("mongoose");
const  FaceModel = require('../../models/face');



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

// async function image(file : any) {
// 	const decoded = tf.node.decodeImage(file);
// 	const casted = decoded.toFloat();
// 	const result = casted.expandDims(0);
// 	decoded.dispose();
// 	casted.dispose();
// 	return result;
//   }

async function uploadLabeledImages(images: any, label: any) {
    try {

        const descriptions = [];
        // Loop through the images
        // for (let i = 0; i < images.length; i++) {

        // const img = await canvas.loadImage(images[i]);
        const img = await canvas.loadImage(images);
        console.log(img)
        // const tensor = await image(images);

        // Read each face and save the face descriptions in the descriptions array
        const detections = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();

        descriptions.push(detections.descriptor);
        // }

        // Create a new face document with the given label and save it in DB
        const createFace = new FaceModel({
            label: label,
            descriptions: descriptions,
        });
        await createFace.save();
        return true;
    } catch (error) {
        console.log(error);
        return (error);
    }
}
// http://localhost:8000/api/face/post-face
// app.post("/post-face", async (req: any, res: any) => {
export const postface = async (req: any, res: any, next: NextFunction) => {
    const { file } = req.files;
    const label = req.body.label
    let result = await uploadLabeledImages(file.data, label);
    if (result) {

        res.json({ message: "Face data stored successfully" })
    } else {
        res.json({ message: "Something went wrong, please try again." })

    }
}

async function getDescriptorsFromDB(file: any) {
    // Get all the face data from mongodb and loop through each of them to read the data
    let faces = await FaceModel.find();

    for (let i = 0; i < faces.length; i++) {
        // Change the face data descriptors from Objects to Float32Array type
        for (let j = 0; j < faces[i].descriptions.length; j++) {
            faces[i].descriptions[j] = new Float32Array(Object.values(faces[i].descriptions[j]));
        }
        // Turn the DB face docs to
        faces[i] = new faceapi.LabeledFaceDescriptors(faces[i].label, faces[i].descriptions);
    }

    // Load face matcher to find the matching face
    const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);

    // Read the image using canvas or other method
    const img = await canvas.loadImage(file);
    console.log(img)

    let temp = faceapi.createCanvasFromMedia(img);
    // Process the image for the model
    const displaySize = { width: img.width, height: img.height };
    faceapi.matchDimensions(temp, displaySize);

    // Find matching faces
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetections.map((d: any) => faceMatcher.findBestMatch(d.descriptor));
    return results;
}


// http://localhost:8000/api/face/check-face
export const checkface = async (req: any, res: any, next: NextFunction) => {
    const { file } = req.files;
    let result = await getDescriptorsFromDB(file.data);
    res.json({ result });

};