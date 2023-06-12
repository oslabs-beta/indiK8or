import passport from "passport";
import { GitUser } from '../models/GitHubModel.js'
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

/* eslint-disable no-undef */
const clientID = process.env.GitHubClientID;
const clientSecret = process.env.GitHubClientSecret;

// Serialize the user object into a session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user object from a session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await GitUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

/* eslint-disable no-undef */
const strategy = new GitHubStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: 'http://localhost:4000/auth/github/callback'
},
async (accessToken, refreshToken, profile, done) => {
  const { username } = profile;
  console.log('Authenticated user profile', profile);
  try {
    const existingUser = await GitUser.findOne({ username });

    if (existingUser) {
      console.log('user already exists', existingUser);

      return done(null, existingUser);
    }
    const newUser = await GitUser.create({
      username: profile.username,
    });
    console.log('new user created', newUser);
    return done(null, newUser);
  } catch (err) {
    console.error(`Error occurred during the auth process ${err}`);
    return done(`Error occured during the auth process ${err}`);
  }
});

passport.use(strategy);

