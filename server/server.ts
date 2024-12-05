import express, { Request, Response } from "express";
import connectToMongoDB, { store } from "./models/databaseModel";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import session from "express-session";
import "./authConfig/passport";
import { nodemonReset, startExecCommand } from "./childProcesses/execCommand";
import { ServerError } from "../types";
import { grafanaRouter } from "./routes/grafanaRouter";
import { loginRouter } from "./routes/loginRouter";
import { logoutRouter } from "./routes/logoutRouter";
import { oAuthRouter } from "./routes/oAuthRouter";
import { podRouter } from "./routes/podRouter";
import { scanRouter } from "./routes/scanRouter";

// require .env files in
dotenv.config();
//connect to database
connectToMongoDB();
// create an Express application
const app = express();
// specify server port as 4000
const port = process.env.PORT || 4000;
// provide default value of empty string when env variables are undefined or null
const sessionSecret: string = process.env.SESSION_SECRET ?? "";

// allow cors to connect frontend and backend server
app.use(
  cors({
    origin: "https://indik8or-359561821b26.herokuapp.com/",
    credentials: true,
  }),
);

// initializes and configures session
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

// initialize passport and set it up for authentication
app.use(passport.initialize());
// provides session-based authentication support
app.use(passport.session());
app.use(express.json());
// parse incoming requests with url-encoded payloads
app.use(express.urlencoded({ extended: true }));
// parse cookie hears from incoming requests
app.use(cookieParser());

// route handlers
app.use("/login", loginRouter);
app.use("/dashboard", grafanaRouter);
app.use("/logout", logoutRouter);
app.use("/auth", oAuthRouter);
app.use("/pod", podRouter);
app.use("/scan", scanRouter);

// If env is Production, serve our static bundle
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "dist")));
  app.get("/*", function (_req, res) {
    return res.sendFile(path.join(path.resolve(), "dist", "index.html"));
  });
}

// catch-all handler
app.use((_req: Request, res: Response) => {
  return res.status(404).send("Invalid endpoint");
});

// global handler
app.use((err: ServerError, _req: Request, res: Response) => {
  const defaultErr: ServerError = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj: ServerError = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// call startExecCommand to start port forwarding of Grafana on 3000
startExecCommand();
// call nodemonReset to handle asyncronous behavior of stopping and resetting port forwarding of Grafana any time Nodemon restarts
nodemonReset();

// server listening on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
