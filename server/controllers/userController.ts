import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";

const userController = {
  // Verifying if an account exists
  verifyAccount: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { username } = req.body;
    // creating a new user and save the user's id to res.locals

    try {
      const user = await User.findOne({ username });
      if (user) {
        res.sendStatus(409);
      } else {
        return next();
      }
    } catch (err) {
      return next({
        log: `Error occurred in userController.verifyAccount ${err}`,
        status: 500,
        message: { err: "Unable to verify account" },
      });
    }
  },
  // delete user
  deleteUser: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { username } = req.params;
    if (!username) {
      res.status(400).send("Please provide a username");
    }
    try {
      const user = await User.findOneAndDelete({ username });
      res.locals.deletedUser = user;
      return next();
    } catch (err) {
      return next({
        log: `Error occurred in userController.deleteUser ${err}`,
        status: 500,
        message: { err: "Unable to delete user" },
      });
    }
  },
  // Creating a new user
  createUser: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { firstName, lastName, username, password } = req.body;
    // creating a new user and save the user's id to res.locals
    if (!firstName || !lastName || !username || !password) {
      return next({
        log: "Error in userController.createUser. Missing input fields",
        status: 400,
        message: { err: "All fields required" },
      });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        firstName,
        lastName,
        username,
        password: hashedPassword,
      });
      res.locals.userId = newUser.id;
      return next();
    } catch (err) {
      return next({
        log: `Error occurred in createUser-create ${err}`,
        status: 500,
        message: { err: "Unable to create user" },
      });
    }
  },
  // Verifying an existing user
  verifyUser: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { username, password } = req.body;
    // both username and password needs to be provided by client
    if (!username || !password) {
      return next({
        log: "Missing username or password in userController.verifyUser",
        status: 400,
        message: { err: "An error occurred" },
      });
    }
    try {
      // finding user in database
      const user = await User.findOne({ username });

      // redirect to signup page if user does not exist
      if (!user) {
        res.status(404).json("Invalid Username or Password");
      } else {
        // compare password from request body to password of the user found in database
        const result = await bcrypt.compare(password, user.password);

        // if password doesn't match redirect to signup page
        if (!result) {
          res.status(404).json("Invalid Username or Password");
        } else {
          // if password matches then save the user's id to res.locals
          res.locals.user = user.id;
          return next();
        }
      }
    } catch (err) {
      return next({
        log: `Error occurred in userController.verifyUser ${err}`,
        status: 500,
        message: { err: "Unable to verify user" },
      });
    }
  },
};
export { userController };
