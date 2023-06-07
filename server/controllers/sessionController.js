import { Session } from '../models/sessionModel.js';

const sessionController = {};

// isLoggedIn - find appropriate session for this request in DB - verify whether or not session is still valid
sessionController.isLoggedIn = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE isLoggedIn middleware -----');
  // finding the session which cookieId matches the cookie ssid sent along with the request
  Session.findOne({ cookieId: req.cookies.ssid })
    .then((session) => {
      console.log('FINDING SESSION');
      // redirect to signup page if session does not exist
      if (!session) {
        console.log('SESSION NOT FOUND');
        res.status(303).json('No active session exists');
      } else {
        console.log('SESSION FOUND');
        res.locals.userId = req.cookies.ssid;
        console.log('res.locals.userId', res.locals.userId);
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

sessionController.logout = async (req, res, next) => {
  console.log('inside logout controller');
  console.log('req.cookies', req.cookies)
  try {
    if(req.cookies && req.cookies.ssid){
    const { ssid } = req.cookies;
    console.log('ssid cookie', ssid);

    const loggedOutUser = await Session.findOneAndDelete({cookieId: ssid});
    if (loggedOutUser) {
      console.log('successfull logout for user', loggedOutUser);
      res.locals.loggedOut = loggedOutUser;
      return next();
    } else {
      console.log('Unsuccessful logout. User session not found')
      res.send('User session not found. Unable to logout');
    }
  } else {
    console.log('No cookie found');
    res.status(404).send('User cookie not found');
  }
  } catch (err) {
    return next({
      log: `logout: ${err}`,
      status: 500,
      message: { err: 'error occurred in sessionController.logout' },
    });
  }
}

export { sessionController };
