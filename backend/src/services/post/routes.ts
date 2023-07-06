import express from 'express';
import jwt from 'express-jwt';

import * as controller from './controller';

export const postRouter = express.Router();


/** GET /api/post/test */
postRouter.route('/test').get(controller.test);

postRouter.route('/create').post(controller.create);
