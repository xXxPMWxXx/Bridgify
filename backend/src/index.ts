import './db';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { services } from './services';

const fileUpload = require("express-fileupload");

//test for face api
const tf = require("@tensorflow/tfjs-node");
// const faceapi = require("face-api.js");

const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const mongoose = require("mongoose");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");

//to access the variable in .env file as : process.env.{variableName}
require('dotenv').config();
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());


// Mount REST on /api
app.use('/api', services);

//To access the image by using http://localhost:8000/images/{fileName}
app.use("/out", express.static("out"));
app.use("/images", express.static('images'));
app.use("/labeled_images", express.static('labeled_images'));

const port = process.env.PORT || 8000;

// app.listen(port, () =>
// 	console.log(`Express app listening on localhost:${port}`)
// );

//connect to mongoDB

mongoose.connect(
	`mongodb://localhost:27017/`,
	{
		useNewUrlParser: true
	}
).then(() => {
	app.listen(process.env.PORT || 8000);
	console.log("DB connected and server us running.");
}).catch((err: any) => {
	console.log(err);
});

const faceDetectionNet = faceapi.nets.ssdMobilenetv1;
const minConfidence = 0.5;
const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence });

async function LoadModels() {
	// Load the models
	// __dirname gives the root directory of the server
	await faceDetectionNet.loadFromDisk(__dirname + "/faceAPIModel");
	await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/faceAPIModel");
	await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/faceAPIModel");
	await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/faceAPIModel");

}
LoadModels();

const faceSchema = new mongoose.Schema({
	label: {
		type: String,
		required: true,
		unique: true,
	},
	descriptions: {
		type: Array,
		required: true,
	},
});

const FaceModel = mongoose.model("Face", faceSchema);

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

app.post("/post-face", async (req: any, res: any) => {
	const { file } = req.files;
	const label = req.body.label
	let result = await uploadLabeledImages(file.data, label);
	if (result) {

		res.json({ message: "Face data stored successfully" })
	} else {
		res.json({ message: "Something went wrong, please try again." })

	}
})

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
console.log("------")
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


app.post("/check-face", async (req: any, res: any) => {

	const { file } = req.files;
	let result = await getDescriptorsFromDB(file.data);
	res.json({ result });

});