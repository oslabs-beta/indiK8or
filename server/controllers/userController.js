import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const userController = {};

// Creating a new user
userController.createUser = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE createUser middleware -----');
  const { username, password } = req.body;
  User.create({ username, password })
    .then((newUser) => {
      res.locals.user = newUser.id;
      return next();
    })
    .catch((err) => {
      return next({
        log: `createUser: ${err}`,
        status: 500,
        message: { err: 'error occurred in createUser controller' },
      });
    });
};

// Verifying an existing user
userController.verifyUser = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE verifyUser middleware -----');
  const { username, password } = req.body;
  if (!username || !password) {
    return next({
      log: 'Missing username or password in userController.verifyUser',
      status: 400,
      message: { err: 'An error occurred' },
    });
  }
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.redirect('/signup');
      } else {
        bcrypt.compare(password, user.password).then((result) => {
          if (!result) {
            res.redirect('/signup');
          } else {
            res.locals.user = user.id;
            return next();
          }
        });
      }
    })
    .catch((err) => {
      return next({
        log: `verifyUser: ${err}`,
        status: 500,
        message: { err: 'error occurred in userController.verifyUser' },
      });
    });
};

export { userController };
