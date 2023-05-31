import { Session } from '../models/sessionModel.js';

const sessionController = {};

// isLoggedIn - find appropriate session for this request in DB - verify whether or not session is still valid

sessionController.isLoggedIn = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE isLoggedIn middleware -----');
  Session.findOne({ cookieId: req.cookies.ssid })
    .then((session) => {
      if (!session) {
        res.redirect('/signup');
      } else {
        return next();
      }
    })
    .catch((err) => {
      return next({
        log: `isLoggedIn: ${err}`,
        status: 500,
        message: { err: 'error occurred in sessionController.isLoggedIn' },
      });
    });
};

// startSession - create and save a new Session into the database.
sessionController.startSession = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE startSession middleware -----');
  Session.create({ cookieId: res.locals.user })
    .then(() => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `startSession: ${err}`,
        status: 500,
        message: { err: 'error occurred in sessionController.startSession' },
      });
    });
};

export { sessionController };
