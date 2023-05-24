import express from 'express';
import jwt from 'express-jwt';

import { config } from '../../config';
import * as controller from './controller';

export const customerRouter = express.Router();

/** GET /api/getInfo */
customerRouter.route('/').get(controller.getAllCustomer);

/** GET /api/getInfo */
customerRouter.route('/getCustomer').get(controller.getCustomer);

/** POST /api/cusomter */
customerRouter.route('/addCustomer').post(controller.addCustomer);

/** PUT /api/cusomter */
customerRouter.route('/updateCustomer').put(controller.updateCustomer);

/** DELETE /api/cusomter */
customerRouter.route('/deleteCustomer').delete(controller.deleteCustomer);