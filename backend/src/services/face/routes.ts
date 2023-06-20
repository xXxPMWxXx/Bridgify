import express from 'express';
import jwt from 'express-jwt';
import * as controller from './controller';

export const faceRouter = express.Router();

/** GET /api/getInfo */

faceRouter.route('/upload').post(controller.upload);

faceRouter.route('/post-face').post(controller.postface);

faceRouter.route('/check-face').post(controller.checkface);
