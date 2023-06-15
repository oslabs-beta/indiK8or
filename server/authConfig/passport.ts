import passport from "passport";
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import { GitUser, IGitUser} from '../models/gitUser'

dotenv.config();

/* eslint-disable no-undef */
const clientID = process.env.GitHubClientID;
const clientSecret = process.env.GitHubClientSecret;

interface GitUser {
  id?: string;
}

// Serialize the user object into a session
passport.serializeUser((user: GitUser, done) => {
  done(null, user.id);
});

// Deserialize the user object from a session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user: IGitUser | null = await GitUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

/* eslint-disable no-undef */
const strategy = new GitHubStrategy({
  clientID: clientID as string,
  clientSecret: clientSecret as string,
  callbackURL: 'http://localhost:4000/auth/github/callback'
},
async (_accessToken: string, _refreshToken: string, profile: any, done:Function) => {
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

