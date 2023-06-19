import express, { Request, Response } from 'express';
import { scanController } from '../controllers/scanController';

const scanRouter = express.Router();

scanRouter.post('/', scanController.scanImage, (_req: Request, res: Response) => {
    console.log('INSIDE SCAN ROUTER');
    console.log('sending back', res.locals.scanned);
    res.status(200).json(res.locals.scanned);
})

export { scanRouter };