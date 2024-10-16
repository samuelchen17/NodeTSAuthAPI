import { User } from "../models/user.model";

export const getUsers = () => User.find();
export const getUserBtyEmail = (email: string) => User.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({ "authentication.sessionTOken": sessionToken });
