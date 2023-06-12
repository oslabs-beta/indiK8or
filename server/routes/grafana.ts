import express from "express";
import { grafanaController } from "../controllers/grafanaController.ts";

const grafanaRouter = express.Router();

grafanaRouter.get('/', grafanaController.nodeExporter, (req, res) => {
  console.log('inside grafanaRouter')
  return res.
  status(200).
  json(res.locals.node);
})

export default grafanaRouter;