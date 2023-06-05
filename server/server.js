import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { loginRouter } from './routes/login.js';

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
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route handlers
app.use('/login', loginRouter);

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
