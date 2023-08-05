import express, { Request, Response } from "express";
import { scanController } from "../controllers/scanController";

const scanRouter = express.Router();
//route handler to handle scan requests from front-end
scanRouter.post(
  "/",
  scanController.isScanned,
  scanController.scanImage,
  (_req: Request, res: Response) => {
    return res.status(200).json(res.locals.scanned);
  },
);

export { scanRouter };
