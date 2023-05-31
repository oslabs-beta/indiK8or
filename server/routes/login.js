import express from 'express';
import userController from './controllers/userController.js';
import sessionController from './controllers/sessionController.js';
import cookieController from './controllers/cookieController.js';

// const loginRouter = express.Router();

// login
loginRouter.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200);
  }
);

// signup
loginRouter.post(
  '/signup',
  userController.createUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200);
  }
);

export const loginRouter = express.Router();
