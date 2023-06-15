import express from 'express';
import jwt from 'express-jwt';

import { config } from '../../config';
import * as controller from './controller';

export const faceRouter = express.Router();

/** GET /api/getInfo */
faceRouter.route('/').get(controller.forTest);

faceRouter.route('/upload').post(controller.upload);

faceRouter.route('/post-face').post(controller.postface);

faceRouter.route('/check-face').post(controller.checkface);
