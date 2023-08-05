import { NextFunction, Request, Response } from "express";

// setSSIDCookie - store the user id in a cookie
const cookieController = {
  setSSIDCookie: async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { user } = res.locals;
    // send an ssid cookie back to client; the cookie will then be stored in browser for future http requests to server
    try {
      await res.cookie("ssid", user, { httpOnly: true });
      return next();
    } catch (err) {
      return next({
        log: `Error occured in cookieController.setSSIDCookie ${err}`,
        status: 500,
        message: { err: `Unable to set cookie` },
      });
    }
  },
};
export { cookieController };
