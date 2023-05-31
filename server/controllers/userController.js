import User from './models/userModel.js';
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
        status: 400,
        message: { err: 'error occurred in createUser controller' },
      });
    });
};

// Verifying an existing user
userController.verifyUser = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE verifyUser middleware -----');
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(404);
      } else {
        bcrypt.compare(password, user.password).then((res) => {
          if (!res) {
            res.status(404);
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
        status: 400,
        message: { err: 'error occurred in verifyUser controller' },
      });
    });
};

