import { NextFunction, Request, Response } from "express";
import { Session } from "../models/sessionModel";
import { OAuthUser } from "../../types";

const sessionController = {
  // isLoggedIn - find appropriate session for this request in DB - verify whether or not session is still valid
  isLoggedIn: (req: Request, res: Response, next: NextFunction): void => {
    const { ssid } = req.cookies;
    // finding the session which cookieId matches the cookie ssid sent along with the request
    Session.findOne({ cookieId: ssid })
      .then((session) => {
        // if session is not found, send status code 303 to frond-end
        if (!session) {
          res.status(303).json("No active session exists");
        } else {
          // if session is found, save cookie ssid in res.locals and return next()
          res.locals.userId = ssid;
          return next();
        }
      })
      .catch((err) => {
        return next({
          log: `isLoggedIn: ${err}`,
          status: 500,
          message: { err: "error occurred in sessionController.isLoggedIn" },
        });
      });
  },

  // startSession - create and save a new Session into the database.
  startSession: (_req: Request, res: Response, next: NextFunction) => {
    const { user } = res.locals;
    // check if session already exists for user
    Session.findOne({ cookieId: user })
      .then((session) => {
        if (session) {
          return next();
        } else {
          // creating a session with a cookieId equals to the user id saved in res.locals
          Session.create({ cookieId: user })
            .then(() => {
              return next();
            })
            .catch((err) => {
              return next({
                log: `startSession: ${err}`,
                status: 500,
                message: {
                  err: "error occurred in sessionController.startSession",
                },
              });
            });
        }
      })
      .catch((err) => {
        return next({
          log: `startSession: ${err}`,
          status: 500,
          message: { err: "error occurred in sessionController.startSession" },
        });
      });
  },

  // startSession - create and save a new Session into the database.
  startGitSession: (req: Request, _res: Response, next: NextFunction) => {
    // check if session already exists for user
    const { _id } = req.user as OAuthUser;
    Session.findOne({ cookieId: _id })
      .then((session) => {
        if (session) {
          return next();
        } else {
          // creating a session with a cookieId equals to the user id saved in res.locals
          Session.create({ cookieId: _id })
            .then(() => {
              return next();
            })
            .catch((err) => {
              return next({
                log: `startSession: ${err}`,
                status: 500,
                message: {
                  err: "error occurred in sessionController.startSession",
                },
              });
            });
        }
      })
      .catch((err) => {
        return next({
          log: `startSession: ${err}`,
          status: 500,
          message: { err: "error occurred in sessionController.startSession" },
        });
      });
  },
  //middleware to log out user from homePage
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ssid } = req.cookies;
      const loggedOutUser = await Session.findOneAndDelete({ cookieId: ssid });
      if (loggedOutUser) {
        // clear HttpOnly cookie
        res.clearCookie("ssid", { httpOnly: true });
        res.locals.loggedOut = loggedOutUser;
        return next();
      } else {
        res.send("User session not found. Unable to logout");
      }
    } catch (err) {
      return next({
        log: `logout: ${err}`,
        status: 500,
        message: { err: "error occurred in sessionController.logout" },
      });
    }
  },
};
export { sessionController };
