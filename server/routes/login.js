import express from 'express';
import { userController } from '../controllers/userController.js';
import { sessionController } from '../controllers/sessionController.js';
import { cookieController } from '../controllers/cookieController.js';

const loginRouter = express.Router();

// authorizing user who has already logged in
loginRouter.post(
  '/isLoggedIn', 
  sessionController.isLoggedIn, 
  (req, res) => {
    console.log('INSIDE AUTHORIZING USER WHO HAS LOGGED IN');
    console.log('res.locals.userId', res.locals.userId);
    return res.status(302).json(res.locals.userId);
  }
)

// login
loginRouter.post(
  '/loginRequest',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    return res.status(200).json('You are logged in');
  }
);

// signup
loginRouter.post(
  '/signupRequest',
  userController.verifyAccount,
  userController.createUser,
  (req, res) => {
    console.log('----INSIDE signupRequest----');
    return res.status(201).json('You have signed up');
  }
);

export { loginRouter };
