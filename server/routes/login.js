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
    return res.status(302).json('User has an active session');
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


// authorized users
// loginRouter.get('/', sessionController.isLoggedIn, (req, res) => {
//   return res.status(200).json('You have an active session');
// })
export { loginRouter };
