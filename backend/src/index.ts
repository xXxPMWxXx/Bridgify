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

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require('./swagger_output.json')

//to access the variable in .env file as : process.env.{variableName}
const app = express();

//swagger
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  
// // get config vars
// dotenv.config();
// // access config var
// process.env.TOKEN_SECRET;

// Middlewares
app.use( bodyParser.json({limit: '50mb'}) );
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit:50000
}));
app.use(cors());
app.use(fileUpload());


// Mount REST on /api
app.use('/api', services);

//To access the image by using http://localhost:8000/images/{fileName}
app.use("/out", express.static("out"));
app.use("/trained_face", express.static("trained_face"));
app.use("/images", express.static('images'));
app.use("/labeled_images", express.static('labeled_images'));

app.use("/elderly", express.static('elderly'));
app.use("/post", express.static('post'));

const port = process.env.PORT || 8000;

//connect to mongoDB
mongoose.connect(
	`mongodb+srv://admin:1234@bridgifydev.1jde3bj.mongodb.net/Bridgify?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true
	}
).then(() => {
	app.listen(port, () => {
		console.log(`Express app listening on localhost:${port}`)
		console.log("DB connected and server is running.");
	});
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
