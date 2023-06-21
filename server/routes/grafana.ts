import express, { Request, Response }from "express";
import { grafanaController } from "../controllers/grafanaController";

const grafanaRouter = express.Router();

grafanaRouter.get('/', grafanaController.nodeExporter, (_req: Request, res: Response) => {
  return res.status(200).json(res.locals.node);
})

export default grafanaRouter;