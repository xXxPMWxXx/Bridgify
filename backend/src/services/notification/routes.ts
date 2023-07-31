import express from 'express';
import jwt from 'express-jwt';

import * as controller from './controller';

export const notificationRouter = express.Router();


/** GET /api/notification/test */
notificationRouter.route('/test').get(controller.test);

/** POST /api/notification/create */
notificationRouter.route('/create').post(controller.create);

