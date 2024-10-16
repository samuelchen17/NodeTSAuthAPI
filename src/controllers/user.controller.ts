import { User } from "../models/user.model";

export const getUsers = () => User.find();
export const getUserByEmail = (email: string) => User.findOne({ email });
// confirm login
export const getUserBySessionToken = (sessionToken: string) =>
  User.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => User.findById(id);
export const createUser = (values: Record<string, any>) => new User(values);
export const deleteUserById = (id: string) =>
  User.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  User.findByIdAndUpdate(id, values);
