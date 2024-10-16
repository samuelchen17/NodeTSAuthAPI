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
