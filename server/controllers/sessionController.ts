import { NextFunction, Request, Response } from "express";
import { Session } from "../models/sessionModel";
import { OAuthUser } from "../../types";

const sessionController = {
  // isLoggedIn - find appropriate session for this request in DB - verify whether or not session is still valid
  isLoggedIn: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { ssid } = req.cookies;
    // finding the session which cookieId matches the cookie ssid sent along with the request

    try {
      const session = await Session.findOne({ cookieId: ssid });
      // if session is not found, send status code 303 to frond-end
      if (!session) {
        res.status(303).json("No active session exists");
      } else {
        // if session is found, save cookie ssid in res.locals and return next()
        res.locals.userId = ssid;
        return next();
      }
    } catch (err) {
      return next({
        log: `Error occured in sessionController.isLoggedIn ${err}`,
        status: 500,
        message: { err: "Unable to find session" },
      });
    }
  },

  // startSession - create and save a new Session into the database.
  startSession: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { user } = res.locals;
    // check if session already exists for user

    try {
      const session = await Session.findOne({ cookieId: user });
      if (session) {
        return next();
      } else {
        // creating a session with a cookieId equals to the user id saved in res.locals

        try {
          await Session.create({ cookieId: user });
          return next();
        } catch (err) {
          return next({
            log: `Error occured in sessionsController.startSession ${err}`,
            status: 500,
            message: {
              err: "Unable to create session",
            },
          });
        }
      }
    } catch (err) {
      return next({
        log: `Error occurred in sessionController.startSession ${err}`,
        status: 500,
        message: { err: "Unable to create session" },
      });
    }
  },

  // startSession - create and save a new Session into the database.
  startGitSession: async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    // check if session already exists for user
    const { _id } = req.user as OAuthUser;

    try {
      const session = await Session.findOne({ cookieId: _id });
      if (session) {
        return next();
      } else {
        // creating a session with a cookieId equals to the user id saved in res.locals

        try {
          await Session.create({ cookieId: _id });
          return next();
        } catch (err) {
          return next({
            log: `Error occured in sessionController.startSession ${err}`,
            status: 500,
            message: {
              err: "Unable to create session",
            },
          });
        }
      }
    } catch (err) {
      return next({
        log: `Error occured in sessionController.startSession ${err}`,
        status: 500,
        message: { err: "Unable to create session" },
      });
    }
  },
  //middleware to log out user from homePage
  logout: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { ssid } = req.cookies;
    try {
      const loggedOutUser = await Session.findOneAndDelete({ cookieId: ssid });
      if (loggedOutUser) {
        // clear HttpOnly cookie
        res.clearCookie("ssid", { httpOnly: true });
        res.locals.loggedOut = loggedOutUser;
        return next();
      } else {
        res.status(400).send("User session not found. Unable to logout");
      }
    } catch (err) {
      return next({
        log: `error occurred in sessionController.logout ${err}`,
        status: 500,
        message: { err: "Unable to logout" },
      });
    }
  },
};
export { sessionController };
