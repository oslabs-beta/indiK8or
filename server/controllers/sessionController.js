import Session from './models/sessionModel.js';

const sessionController = {};

// isLoggedIn - find appropriate session for this request in DB - verify whether or not session is still valid

sessionController.isLoggedIn = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE isLoggedIn middleware -----');
  const { ssid } = req.cookies;
  Session.findOne({ cookieId: ssid })
    .then((session) => {
      if (!session) {
        res.status(404);
      } else {
        return next();
      }
    })
    .catch((err) => {
      return next({
        log: `isLoggedIn: ${err}`,
        status: 400,
        message: { err: 'error occurred in isLoggedIn controller' },
      });
    });
};

// startSession - create and save a new Session into the database.
sessionController.startSession = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE startSession middleware -----');
  const id = res.locals.userId;
  Session.create({ cookieId: id })
    .then(() => {
      return next();
    })
    .catch((err) => {
      return next({
        log: `startSession: ${err}`,
        status: 400,
        message: { err: 'error occurred in startSession controller' },
      });
    });
};
