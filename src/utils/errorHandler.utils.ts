import { User } from "../models/user.model";

export const handleError = (error: unknown, message: string): never => {
  if (error instanceof Error) {
    throw new Error(`${message}: ${error.message}`);
  }
  throw new Error(`${message}: Unknown Error`);
};

export const getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    handleError(error, "Unable to get users");
  }
};
