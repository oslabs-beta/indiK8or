import express from "express";
import { Request, Response } from "express";
import { cookieController } from "../controllers/cookieController";
import { sessionController } from "../controllers/sessionController";
import { userController } from "../controllers/userController";

const loginRouter = express.Router();
// authorizing user who has already logged in
loginRouter.get(
  "/isLoggedIn",
  sessionController.isLoggedIn,
  (_req: Request, res: Response) => {
    return res.status(302).json(res.locals.userId);
  },
);
// loginRouter to handle login request
loginRouter.post(
  "/loginRequest",
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (_req: Request, res: Response) => {
    return res.status(200).send("You are logged in");
  },
);
// loginRouter to handle sign up request
loginRouter.post(
  "/signupRequest",
  userController.verifyAccount,
  userController.createUser,
  (_req: Request, res: Response) => {
    return res.status(201).json({ userId: res.locals.userId });
  },
);

export { loginRouter };
