import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { sessionController } from '../controllers/sessionController';

const oAuthRouter = express.Router();

oAuthRouter.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  (_req: Request, res: Response): void => {
    console.log('Inside OauthRouter successful Oauth');
    res.status(202).send(`Successful Oauth Signup/Login`);
  }
);

oAuthRouter.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/error' }),
  function (_req: Request, _res: Response, next: NextFunction) {
    next();
  },
  sessionController.startGitSession,
  (req: Request, res: Response) => {
    console.log('Inside OauthRouter successful Oauth');
    console.log('req.user', req.user);
    if (req.user && (req.user as any)._id){
      const userId = (req.user as any)._id;
    res.cookie('ssid', userId, { httpOnly: true });
    return res.redirect('http://localhost:5000/home');
    }
  }
);

oAuthRouter.get('/error', (_req: Request, res: Response) => {
  console.log('Inside OauthRouter error');
  return res.status(500).send(`Error occured during GitHub Oauth`);
});

export { oAuthRouter };