import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { sessionController } from '../controllers/sessionController';
import { OAuthUser } from '../../types';

const oAuthRouter = express.Router();

oAuthRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), (_req: Request, res: Response) => {
   return res.status(202).send(`Successful Oauth Signup/Login`);
  }
);

oAuthRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/auth/error' }), function (_req: Request, _res: Response, next: NextFunction) {next();},
 sessionController.startGitSession, (req: Request, res: Response) => {
    if (req.user && (req.user as OAuthUser)._id){
      const userId = (req.user as OAuthUser)._id;
    res.cookie('ssid', userId, { httpOnly: true });
    return res.redirect('http://localhost:5000/home');
    }
  }
);

oAuthRouter.get('/error', (_req: Request, res: Response) => {
  return res.status(500).send(`Error occured during GitHub Oauth`);
});

export { oAuthRouter };
