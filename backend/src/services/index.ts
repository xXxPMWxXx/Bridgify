import express from 'express';
import { faceRouter } from './face';

export const services = express.Router();


services.use('/face', faceRouter);