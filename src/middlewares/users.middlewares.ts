import { Request, Response, NextFunction } from "express";
import { getUserByEmail, getUsers } from "../services/user.services";
import { CustomError } from "../utils/errorHandler.utils";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers();

    res.status(200).json({ message: "Got all users", user: users });
  } catch (error) {
    next(new CustomError(400, "Unable to get users"));
  }
};
