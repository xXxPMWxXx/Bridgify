import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from './utils';
// import * as face from '../../../images'
const path = require("path");

// const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
import * as faceapi from 'face-api.js';
const REFERENCE_IMAGE = '../../../images/bbt1.jpg'
const QUERY_IMAGE = '../../../images/bbt4.jpg'



// async function run() {

//   await faceDetectionNet.loadFromDisk('../../faceAPIModel')
//   await faceapi.nets.faceLandmark68Net.loadFromDisk('../../faceAPIModel')
//   await faceapi.nets.faceRecognitionNet.loadFromDisk('../../faceAPIModel')

//   const referenceImage = await canvas.loadImage(REFERENCE_IMAGE)

//   const queryImage = await canvas.loadImage(QUERY_IMAGE)

//   const resultsRef = await faceapi.detectAllFaces(referenceImage, faceDetectionOptions)
//     .withFaceLandmarks()
//     .withFaceDescriptors()

//   const resultsQuery = await faceapi.detectAllFaces(queryImage, faceDetectionOptions)
//     .withFaceLandmarks()
//     .withFaceDescriptors()



//   const faceMatcher = new faceapi.FaceMatcher(resultsRef)

//   const labels = faceMatcher.labeledDescriptors
//     .map((ld: { label: any; }) => ld.label);

//   const refDrawBoxes = resultsRef
//     .map((res: { detection: { box: any; }; }) => res.detection.box)
//     .map((box: any, i: number) => new faceapi.draw.DrawBox(box, { label: labels[i] }));

//   const outRef = faceapi.createCanvasFromMedia(referenceImage);

//   refDrawBoxes.forEach((drawBox: { draw: (arg0: any) => any; }) => drawBox.draw(outRef));
//   console.log(labels)

//   saveFile('referenceImage.jpg', (outRef as any).toBuffer('image/jpeg'))

//   const queryDrawBoxes = resultsQuery.map((res: { descriptor: any; detection: { box: any; }; }) => {
//     const bestMatch = faceMatcher.findBestMatch(res.descriptor)
//     return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
//   })
//   const outQuery = faceapi.createCanvasFromMedia(queryImage)
//   queryDrawBoxes.forEach((drawBox: { draw: (arg0: any) => any; }) => drawBox.draw(outQuery))
//   saveFile('queryImage.jpg', (outQuery as any).toBuffer('image/jpeg'))
//   console.log('done, saved results to out/queryImage.jpg')
// }

// run()