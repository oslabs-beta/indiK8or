import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import { ServerError } from '../../types';
const userController = {
// Verifying if an account exists
verifyAccount: (req: Request, res: Response, next: NextFunction): void => {
  const { username } = req.body;
  // creating a new user and save the user's id to res.locals
  User.findOne({ username })
    .then((user) => {
      if (user) {
        res.sendStatus(409);
      } else {
        return next();
      }
    })
    .catch((err) => {
      return next({
        log: `verifyAccount: ${err}`,
        status: 500,
        message: { err: 'error occurred in userController-verifyAccount' },
      });
    });
},

// Creating a new user
createUser: (req: Request, res: Response, next: NextFunction): void => {
  const { firstName, lastName, username, password } = req.body;
  // creating a new user and save the user's id to res.locals
  User.create({ firstName, lastName, username, password })
    .then((newUser) => {
      res.locals.user = newUser.id;
      return next();
    })
    .catch((err) => {
      return next({
        log: `createUser: ${err}`,
        status: 500,
        message: { err: 'error occurred in createUser-create' },
      });
    });
},
// Verifying an existing user
verifyUser: (req: Request, res: Response, next: NextFunction): void => {
  const { username, password } = req.body;
  // both username and password needs to be provided by client
  if (!username || !password) {
    return next({
      log: 'Missing username or password in userController.verifyUser',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
  // finding user in database
  User.findOne({ username })
    .then((user) => {
      // redirect to signup page if user does not exist
      if (!user) {
        res.status(404).json('Invalid Username or Password');
      } else {
        // compare password from request body to password of the user found in database
        bcrypt.compare(password, user.password).then((result) => {
          // if password doesn't match redirect to signup page
          if (!result) {
            res.status(404).json('Invalid Username or Password');
          } else {
            // if password matches then save the user's id to res.locals
            res.locals.user = user.id;
            return next();
          }
        });
      }
    })
    .catch((err: ServerError) => {
      return next({
        log: `verifyUser: ${err}`,
        status: 500,
        message: { err: 'error occurred in userController.verifyUser' },
      });
    });
},
}
export { userController };
