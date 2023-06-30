import express from 'express';
import { faceRouter } from './face';
import { userRouter } from './user';
import { nftRouter } from './nft';

export const services = express.Router();


services.use('/face', faceRouter);
services.use('/user', userRouter);
services.use('/nft', nftRouter);