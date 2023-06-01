import { User } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const userController = {};

// Creating a new user
userController.createUser = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE createUser middleware -----');
  const { firstname, lastname, username, password } = req.body;
  // creating a new user and save the user's id to res.locals
  User.create({ firstname, lastname, username, password })
    .then((newUser) => {
      console.log(newUser);
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
        res.redirect('/signupRequest');
      } else {
        // compare password from request body to password associated with the user found in database
        bcrypt.compare(password, user.password).then((result) => {
          // if password doesn't match redirect to signup page
          if (!result) {
            res.redirect('/signupRequest');
          } else {
            // if password matches then save the user's id to res.locals
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
