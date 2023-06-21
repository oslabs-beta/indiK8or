import express, { Request, Response }from "express";
import { grafanaController } from "../controllers/grafanaController";

const grafanaRouter = express.Router();
//a route to get grafana ui and send to the front-end
grafanaRouter.get('/', grafanaController.nodeExporter, (_req: Request, res: Response) => {
  return res.status(200).json(res.locals.node);
})

export default grafanaRouter;