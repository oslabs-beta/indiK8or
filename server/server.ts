import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import './authConfig/passport';
import { startExecCommand, stopChildProcess } from './childProcesses/execCommand';
import { oAuthRouter } from './routes/oAuth';
import grafanaRouter from './routes/grafana';
import { loginRouter } from './routes/login';
import { logoutRouter } from './routes/logout';
import { podRouter } from './routes/pod';
import { scanRouter } from './routes/scan';
import { ServerError } from '../types';

// require .env files in
dotenv.config();

const app = express();
const port = 4000;
/* eslint-disable no-undef */
// provide default value of empty string when env variables are undefined or null
const mongoURI: string = process.env.MONGO_URI ?? '';
const sessionSecret: string = process.env.SESSION_SECRET ?? '';
// mongoose.connect(mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err: string) => console.log(err));

// allow cors
app.use(
  cors({
    origin: 'http://localhost:5000',
    credentials: true,
  })
);

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route handlers
app.use('/login', loginRouter);
app.use('/dashboard', grafanaRouter);
app.use('/logout', logoutRouter);
app.use('/auth', oAuthRouter);
app.use('/pod', podRouter);
app.use('/scan', scanRouter);

// catch-all handler
app.use((_req: Request, res: Response) =>
  res.status(404).send('Invalid endpoint')
);

// global handler
app.use((err: ServerError, _req: Request, res: Response) => {
  const defaultErr: ServerError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj: ServerError = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  // return res.status(errorObj.status).json(errorObj.message);
  return res.status(errorObj.status).json(errorObj.message);
});

// call startExecCommand to start port forwarding of Grafana on 3000
startExecCommand();

/*
 Listen for SIGUSR2 signal (Nodemon restart event)
 The process.once() method is used instead of process.on() to ensure that the listener function is executed only once for the first occurrence of the SIGUSR2 signal.
*/
process.once('SIGUSR2', async () => {
  // awaiting the stopChildProcess will ensure that the child process has stopped before proceeding
  await stopChildProcess();
  // Restart the server after stopping the child process
  process.kill(process.pid, 'SIGUSR2');
});

// Handle the process exit event
process.on('exit', async () => {
  // awaiting the stopChildProcess will ensure that the child process has stopped before proceeding
  await stopChildProcess();
});

// server listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});