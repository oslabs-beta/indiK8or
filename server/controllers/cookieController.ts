import { NextFunction, Request, Response } from "express";

// setSSIDCookie - store the user id in a cookie
const cookieController = {
  setSSIDCookie: (_req: Request, res: Response, next: NextFunction): void => {
    const { user } = res.locals;
    // send an ssid cookie back to client; the cookie will then be stored in browser for future http requests to server
    res.cookie("ssid", user, { httpOnly: true });
    return next();
  },
};
export { cookieController };
