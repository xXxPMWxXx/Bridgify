import { NextFunction, Request, Response } from 'express';
import '@tensorflow/tfjs-node';

const canvas = require('canvas');
const path = require("path");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const faceApiService = require("../../services/utils/faceapiService");
const FaceModel = require('../../models/face');
const baseDir = path.resolve(__dirname, "../../..");


export async function uploadLabeledImages(images: any, label: any) {
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
        try {
            await createFace.save();
            return true;
        } catch (error) {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getDescriptorsFromDB(file: any) {
    try {
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

    } catch (error) {
        return error;
    }
}