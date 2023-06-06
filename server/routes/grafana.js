import express from "express";
// import fetch from "node-fetch";
import { grafanaController } from "../controllers/grafanaController.js";

const grafanaRouter = express.Router();

grafanaRouter.get('/', grafanaController.nodeExporter, (req, res) => {
  console.log('inside grafanaRouter')
  return res.
  status(200).
  json(res.locals.node);
})

export default grafanaRouter;