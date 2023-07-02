import express from 'express';
import jwt from 'express-jwt';

import * as controller from './controller';

export const userRouter = express.Router();



userRouter.route('/test').get(controller.test);

/** POST /api/user/signup */
userRouter.route('/signup').post(controller.signup);

/** GET /api/user/login */
userRouter.route('/login').post(controller.login);

/** GET /api/user/getall */
userRouter.route('/getall').get(controller.getall);

/** GET /api/user/user-profile */
userRouter.route('/user-profile').get(controller.userProfile);