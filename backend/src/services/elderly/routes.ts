import express from 'express';
import jwt from 'express-jwt';

import * as controller from './controller';

export const elderlyRouter = express.Router();


/** POST /api/elderly/insert */
elderlyRouter.route('/insert').post(controller.insert);

/** PUT /api/elderly/update */
elderlyRouter.route('/update').put(controller.update);

/** DELETE /api/elderly/delete/?id=123A */
elderlyRouter.route('/delete').delete(controller.delete_elderly);

/** GET /api/elderly/get/?id=123A */
elderlyRouter.route('/get').get(controller.get);

/** GET /api/elderly/getAll */
elderlyRouter.route('/getAll').get(controller.getAll);