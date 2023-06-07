import './db';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { services } from './services';
const fileUpload = require("express-fileupload");

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

const port = process.env.PORT || 8000;

app.listen(port, () =>
	console.log(`Express app listening on localhost:${port}`)
);
