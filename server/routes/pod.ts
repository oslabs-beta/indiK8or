import express, { Request, Response } from 'express';
import { podController } from '../controllers/podController';

const podRouter = express.Router();

podRouter.get('/', podController.getPods, podController.getImages, (_req: Request, res: Response) => {
    console.log('INSIDE POD ROUTER', res.locals.pods);
    res.status(200).json(res.locals.pods);
})

export { podRouter };