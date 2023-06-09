import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { loginRouter } from './routes/login.js';
import { logoutRouter } from './routes/logout.js';
import grafanaRouter from './routes/grafana.js';
import cookieParser from 'cookie-parser';

// require .env files in
dotenv.config();

const app = express();
const port = 4000;

// eslint-disable-next-line no-undef
const mongoURI = process.env.MONGO_URI;
// mongoose.connect(mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log(err));

// allow cors
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// route handlers
app.use('/login', loginRouter);
app.use('/dashboard', grafanaRouter);
app.use('/logout', logoutRouter);

// catch-all handler
app.use((req, res) => res.status(404).send('Invalid endpoint'));

// global handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

// server listening
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
