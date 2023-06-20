import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { services } from './services';
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const fileUpload = require("express-fileupload");

//test for face api
// const tf = require("@tensorflow/tfjs-node");

const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const mongoose = require("mongoose");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");


//to access the variable in .env file as : process.env.{variableName}
const app = express();

// // get config vars
// dotenv.config();
// // access config var
// process.env.TOKEN_SECRET;

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());


// Mount REST on /api
app.use('/api', services);

//To access the image by using http://localhost:8000/images/{fileName}
app.use("/out", express.static("out"));
app.use("/trained_face", express.static("trained_face"));
app.use("/images", express.static('images'));
app.use("/labeled_images", express.static('labeled_images'));

const port = process.env.PORT || 8000;

//connect to mongoDB
mongoose.connect(
	// `mongodb://localhost:27017/Bridgify`,
	`mongodb+srv://admin:<password>@bridgifydev.1jde3bj.mongodb.net/Bridgify?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true
	}
).then(() => {
	app.listen(process.env.PORT || 8000);
	console.log("DB connected and server us running.");
}).catch((err: any) => {
	console.log(err);
});

//load the face api model
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
