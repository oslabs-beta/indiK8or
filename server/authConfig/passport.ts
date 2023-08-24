import { NextFunction } from "express";
import dotenv from "dotenv";
import { GitUser, IGitUser } from "../models/gitUser";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

//load environment variables from a .env file
dotenv.config();

// if ClientID or Secret are undefined, default to an empty string
const clientID = process.env.GitHubClientID ?? "";
const clientSecret = process.env.GitHubClientSecret ?? "";

//define types
interface GitUser {
  id?: string;
}
interface doneFunction extends NextFunction {
  (arg1: null, arg2: GitUser): void;
}
interface GitHubProfile {
  username: string;
}
// After the user is either created or confirmed to exist in our GitHubStrategy callback, they will be passed here.
// We then create a cookie with their userID here, then pass the userID into done again, which will call the deserializeUser func
passport.serializeUser((user: GitUser, done) => {
  done(null, user.id);
});

// Search for user in our database, then pass user to next middleware
passport.deserializeUser(async (id: string, done) => {
  try {
    const user: IGitUser | null = await GitUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//create a new instance of a GitHub authentication strategy for Passport.js
const strategy = new GitHubStrategy(
  {
    clientID: clientID as string,
    clientSecret: clientSecret as string,
    callbackURL: "/auth/github/callback",
  },
  //define a callback function that is executed after a user is authenticated using the GitHub authentication strategy
  //this function takes the username from the returned Github profile, it will then store that user in our database, if they don't already exist
  async (
    _accessToken: string,
    _refreshToken: string,
    profile: GitHubProfile,
    done: doneFunction,
  ) => {
    const { username } = profile;
    try {
      const existingUser = await GitUser.findOne({ username });
      if (existingUser) {
        return done(null, existingUser);
      }
      const newUser = await GitUser.create({
        username: username,
      });
      return done(null, newUser);
    } catch (err) {
      return done(`Error occured during the auth process ${err}`);
    }
  },
);

passport.use(strategy);
