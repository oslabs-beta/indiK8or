import express from "express";
import passport from "passport";
import { sessionController } from "../controllers/sessionController.js";

const oAuthRouter = express.Router();

oAuthRouter.get('/github', passport.authenticate('github',{ scope: [ 'user:email' ] }),  (req, res) => {
  console.log('Inside OauthRouter successful Oauth')
  return res
  .status(202)
  .send(`Successful Oauth Signup/Login`);
})

oAuthRouter.get('/github/callback',passport.authenticate('github', { failureRedirect: '/auth/error' }),
function(req, res, next) {next()}, sessionController.startGitSession, (req, res) => {
  console.log('Inside OauthRouter successful Oauth')
  console.log('req.user', req.user)
  res.cookie('ssid', req.user._id, { httpOnly: true });
  return res
  .redirect('http://localhost:5000/home');
});

oAuthRouter.get('/error', (req, res) => {
  console.log('Inside OauthRouter error')
  return res
  .status(500)
  .send(`Error occured during GitHub Oauth`);
})

export { oAuthRouter };