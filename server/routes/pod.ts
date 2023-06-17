import express, { Request, Response } from 'express';
import { podController } from '../controllers/podController';

const podRouter = express.Router();

podRouter.get('/', podController.getPods, (_req: Request, res: Response) => {
    console.log('INSIDE POD ROUTER');
    res.status(200).json(res.locals.pods);
})

export { podRouter };