import express from "express";
import { sessionController } from "../controllers/sessionController.js";

const logoutRouter = express.Router();

logoutRouter.get('/', sessionController.logout, (req, res) => {
  return res
  .status(202)
  .send(`Successful logout`);
})

export { logoutRouter };