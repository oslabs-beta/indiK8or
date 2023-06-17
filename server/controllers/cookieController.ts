import { Request, Response, NextFunction } from 'express';

// setSSIDCookie - store the user id in a cookie
const cookieController = {
setSSIDCookie: (_req: Request, res: Response, next: NextFunction): void => {
  console.log('----- SUCCESS! INSIDE setSSIDCookie middleware -----');
  // send an ssid cookie back to client; the cookie will then be stored in browser for future http requests to server
  res.cookie('ssid', res.locals.user, { httpOnly: true });
  console.log('----FINISHED SETTING SSID COOKIE----');
  return next();
},
};
export { cookieController };
