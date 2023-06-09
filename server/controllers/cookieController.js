const cookieController = {};

// setSSIDCookie - store the user id in a cookie
cookieController.setSSIDCookie = (req, res, next) => {
  console.log('----- SUCCESS! INSIDE setSSIDCookie middleware -----');
  // send an ssid cookie back to client; the cookie will then be stored in browser for future http requests to server
  res.cookie('ssid', res.locals.user, { httpOnly: true });
  console.log('----FINISHED SETTING SSID COOKIE----');
  return next();
};

export { cookieController };
