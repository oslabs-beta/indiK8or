import express, { Request, Response } from 'express';
import { scanController } from '../controllers/scanController';

const scanRouter = express.Router();

scanRouter.post('/', scanController.isScanned, scanController.scanImage, (_req: Request, res: Response) => {
    console.log('INSIDE SCAN ROUTER');
    res.status(200).json(res.locals.scanned);
})

export { scanRouter };