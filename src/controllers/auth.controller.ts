import { NextFunction, Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/user.services";
import { random, authentication } from "../utils/user.utils";
import { CustomError } from "../utils/errorHandler.utils";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return next(new CustomError(400, "All fields are required"));
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return next(new CustomError(400, "User already exists"));
    }

    // generate salt and hash pw
    const salt = random();
    const hashedPassword = authentication(salt, password); // custom authentication hash

    const newUser = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Successfully registered", user: newUser });
  } catch (error) {
    next(new CustomError(500, "Failed to register user"));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new CustomError(400, "All fields are required"));
    }

    const user = await getUserByEmail(email).select(
      "authentication.salt + authentication.password"
    );

    if (!user) {
      return next(new CustomError(400, "User not found"));
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      next(new CustomError(403, "Incorrect email or password"));
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();
  } catch (error) {
    next(new CustomError(500, "Failed to log user in"));
  }
};
