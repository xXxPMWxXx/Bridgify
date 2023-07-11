import express from 'express';
import jwt from 'express-jwt';

import * as controller from './controller';

export const recordRouter = express.Router();

/** GET /api/record/test */
recordRouter.route('/test').get(controller.test);

/** POST /api/record/create */
recordRouter.route('/create').post(controller.create);

/** GET /api/record/display */
recordRouter.route('/display').get(controller.display);

/** POST /api/record/delete */
// recordRouter.route('/delete').post(controller.deleteRecord);

/** GET /api/record/getSelected */
recordRouter.route('/getSelected').get(controller.getSelected);

/** GET /api/record/getAll for the admin*/
recordRouter.route('/getAll').get(controller.getAll);


