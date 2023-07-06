import express from 'express';
import { faceRouter } from './face';
import { userRouter } from './user';
import { elderlyRouter } from './elderly';
import { recordRouter } from './record';
import { postRouter } from './post';
import { notificationRouter } from './notification';
import { testRouter } from './testing';

export const services = express.Router();


services.use('/face', faceRouter);
services.use('/user', userRouter);
services.use('/elderly', elderlyRouter);
services.use('/record', recordRouter);
services.use('/post', postRouter);
services.use('/notification', notificationRouter);
services.use('/testing', testRouter);