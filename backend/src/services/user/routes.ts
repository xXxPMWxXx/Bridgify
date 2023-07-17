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

/**  PUT /api/user/update*/
userRouter.route('/update').put(controller.updateUser);

/** POST /api/user/linkToElderly */
userRouter.route('/linkelderly').post(controller.linkElderly);

/** POST /api/user/linkToElderly */
userRouter.route('/remove-linkelderly').post(controller.removeLinkElderly);


//forget password
/** GET /api/user/generateOTP */
userRouter.route('/generateOTP').get(controller.generateOTP);

/** GET /api/user/verifyOTP */
userRouter.route('/verifyOTP').get(controller.verifyOTP);

/** POST /api/user/reset */
userRouter.route('/reset').post(controller.reset);