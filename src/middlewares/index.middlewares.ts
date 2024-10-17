import { Request, Response, NextFunction } from "express";
import { get, identity, merge } from "lodash";
import { getUserBySessionToken } from "../services/user.services";
import { CustomError } from "../utils/errorHandler.utils";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["motoBlogAuthToken"];

    if (!sessionToken) {
      next(new CustomError(403, "Authentication token is missing"));
    }

    // check if there is existing user by this sessionToken
    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      next(new CustomError(403, "User session is invalid or has expired"));
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    next(new CustomError(400, "User is not authenticated"));
  }
};
