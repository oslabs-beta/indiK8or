import { Request, Response, NextFunction } from 'express';
import { Session } from '../models/sessionModel.js';

const sessionController: any = {};

// isLoggedIn - find appropriate session for this request in DB - verify whether or not session is still valid
sessionController.isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
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
sessionController.startSession = (_req: Request, res: Response, next: NextFunction) => {
  console.log('----- SUCCESS! INSIDE startSession middleware -----');
  // check if session already exists for user
  Session.findOne({cookieId: res.locals.user})
    .then((session) => {
      if (session) {
        console.log('user has an active session');
        return next();
      } else {
         // creating a session with a cookieId equals to the user id saved in res.locals
        Session.create({ cookieId: res.locals.user })
        .then(() => {
          console.log('session created');
          return next();
        })
        .catch((err) => {
          console.log('session creation error')
          return next({
            log: `startSession: ${err}`,
            status: 500,
            message: { err: 'error occurred in sessionController.startSession' },
          });
        });
      }
    })
    .catch((err) => {
      console.log('session check error')
      return next({
        log: `startSession: ${err}`,
        status: 500,
        message: { err: 'error occurred in sessionController.startSession' },
      })
    })
};

// startSession - create and save a new Session into the database.
sessionController.startGitSession = (req: Request, _res: Response, next: NextFunction) => {
  console.log('Start Git called')
  console.log('req.user', req.user) ;
  // check if session already exists for user
  Session.findOne({cookieId: (req.user as any)._id})
    .then((session) => {
      if (session) {
        console.log('user has an active session');
        return next();
      } else {
         // creating a session with a cookieId equals to the user id saved in res.locals
        Session.create({ cookieId: (req.user as any)._id})
        .then(() => {
          console.log('session created');
          return next();
        })
        .catch((err) => {
          console.log('session creation error')
          return next({
            log: `startSession: ${err}`,
            status: 500,
            message: { err: 'error occurred in sessionController.startSession' },
          });
        });
      }
    })
    .catch((err) => {
      console.log('session check error')
      return next({
        log: `startSession: ${err}`,
        status: 500,
        message: { err: 'error occurred in sessionController.startSession' },
      })
    })
};

sessionController.logout = async (req: Request, res: Response, next: NextFunction) => {
  console.log('inside logout controller');
  console.log('req.body', req.body)
  try {
    const { userId } = req.body;
    const loggedOutUser = await Session.findOneAndDelete({cookieId: userId});
    if (loggedOutUser) {
      console.log('successfull logout for user', loggedOutUser._id);
      // clear HttpOnly cookie
      res.clearCookie('ssid', { httpOnly: true });
      res.locals.loggedOut = loggedOutUser;
      return next();
    } else {
      console.log('Unsuccessful logout. User session not found')
      res.send('User session not found. Unable to logout');
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
