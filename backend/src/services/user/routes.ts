import express from 'express';
import jwt from 'express-jwt';

import * as controller from './controller';

export const userRouter = express.Router();



userRouter.route('/test').get(controller.test);

/** POST /api/user/signup */
userRouter.route('/signup').post(controller.signup);

/** GET /api/user/login */
userRouter.route('/login').get(controller.login);

