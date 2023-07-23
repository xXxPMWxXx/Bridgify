import express from 'express';
import * as controller from './controller';
export const postRouter = express.Router();

//Refer Postman on the request.body etc

/** POST /api/post/create */
postRouter.route('/create').post(controller.create);
/** GET /api/post/getAll */
postRouter.route('/getAll').get(controller.getAll);
/** GET /api/post/getByUser?email={email} */
postRouter.route('/getByUser').get(controller.getByUser);
/** GET /api/post/getByUser */
postRouter.route('/getNonElderlyInvolved').get(controller.getNonElderlyInvolved);
/** PUT /api/post/update */
postRouter.route('/update').put(controller.update);