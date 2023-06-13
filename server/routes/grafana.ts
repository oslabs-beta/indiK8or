import express, { Request, Response }from "express";
import { grafanaController } from "../controllers/grafanaController";

const grafanaRouter = express.Router();

grafanaRouter.get('/', grafanaController.nodeExporter, (_req: Request, res: Response): void => {
  console.log('inside grafanaRouter')
  res.
  status(200).
  json(res.locals.node);
})

export default grafanaRouter;