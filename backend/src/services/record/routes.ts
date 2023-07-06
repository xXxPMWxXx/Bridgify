import express from 'express';
import jwt from 'express-jwt';

import * as controller from './controller';

export const recordRouter = express.Router();


/** GET /api/record/test */
recordRouter.route('/test').get(controller.test);

