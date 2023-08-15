import express from "express";
import { Request, Response } from "express";
import { sessionController } from "../controllers/sessionController";
import { userController } from "../controllers/userController";

const logoutRouter = express.Router();
//route to log user out
logoutRouter.get(
  "/",
  sessionController.logout,
  (_req: Request, res: Response) => {
    return res.status(202).send(`Successful logout`);
  },
);

logoutRouter.delete(
  "/",
  userController.deleteUser,
  (_req: Request, res: Response) => {
    return res.status(202).json(res.locals.deletedUser);
  },
);

export { logoutRouter };
