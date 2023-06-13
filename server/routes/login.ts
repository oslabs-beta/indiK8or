import express from 'express';
import {Request, Response} from 'express';
import { userController } from '../controllers/userController';
import { sessionController } from '../controllers/sessionController';
import { cookieController } from '../controllers/cookieController';

const loginRouter = express.Router();

// authorizing user who has already logged in
loginRouter.post(
  '/isLoggedIn', 
  sessionController.isLoggedIn, 
  (_req: Request, res: Response): void => {
    console.log('INSIDE AUTHORIZING USER WHO HAS LOGGED IN');
    console.log('res.locals.userId', res.locals.userId);
    res.status(302).json(res.locals.userId);
  }
)

// login
loginRouter.post(
  '/loginRequest',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (_req: Request, res: Response): void => {
    res.status(200).json('You are logged in');
  }
);

// signup
loginRouter.post(
  '/signupRequest',
  userController.verifyAccount,
  userController.createUser,
  (_req: Request, res: Response): void => {
    console.log('----INSIDE signupRequest----');
    res.status(201).json('You have signed up');
  }
);

export { loginRouter };
