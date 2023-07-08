import express from 'express';
import jwt from 'express-jwt';

import * as controller from './controller';

export const postRouter = express.Router();

//Refer Postman on the request.body etc

/** GET /api/post/test */
postRouter.route('/test').get(controller.test);
/** POST /api/post/create */
postRouter.route('/create').post(controller.create);
/** GET /api/post/getAll */
postRouter.route('/getAll').get(controller.getAll);
