import { Session } from '../models/sessionModel.js';

const sessionController = {};

// isLoggedIn - find appropriate session for this request in DB - verify whether or not session is still valid
sessionController.isLoggedIn = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE isLoggedIn middleware -----');
  // finding the session which cookieId matches the cookie ssid sent along with the request
  Session.findOne({ cookieId: req.cookies.ssid })
    .then((session) => {
      // redirect to signup page if session does not exist
      if (!session) {
        res.status(404).json('No active session exists');
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
  // creating a session with a cookieId equals to the user id saved in res.locals
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
