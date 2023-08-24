import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import { sessionController } from "../controllers/sessionController";
import { OAuthUser } from "../../types";

const oAuthRouter = express.Router();

//route to access Github API, sending our client ID, secret, and callbackURI to Github and requesting the users profile info
oAuthRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (_req: Request, res: Response) => {
    return res.status(202).send(`Successful Oauth Signup/Login`);
  },
);
//redirect route that Github will send user profile info to as a query param including users profile
oAuthRouter.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/auth/error" }),
  // add a next function to connect to next middleware since authenticate does not return next()
  function (_req: Request, _res: Response, next: NextFunction) {
    next();
  },
  sessionController.startGitSession,
  (req: Request, res: Response) => {
    if (req.user && (req.user as OAuthUser)._id) {
      const { _id } = req.user as OAuthUser;
      res.cookie("ssid", _id, { httpOnly: true });
      // if in production mode, redirect to home, otherise redirect to 5000/home
      if (process.env.NODE_ENV === "production") {
        return res.redirect("/home");
      } else {
        return res.redirect("http://localhost:5000/");
      }
    }
  },
);

oAuthRouter.get("/error", (_req: Request, res: Response) => {
  return res.status(500).send(`Error occured during GitHub Oauth`);
});

export { oAuthRouter };
