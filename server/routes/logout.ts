import express from "express";
import { Request, Response } from "express";
import { sessionController } from "../controllers/sessionController";

const logoutRouter = express.Router();
//route to log user out
logoutRouter.post('/', sessionController.logout, (_req: Request, res: Response): void => {
   res
  .status(202)
  .send(`Successful logout`)
})

export { logoutRouter };