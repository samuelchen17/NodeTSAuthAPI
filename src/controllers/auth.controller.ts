import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/user.services";
import { random, authentication } from "../utils/user.utils";

export const register = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  if (!email || !password || username) {
    return res.sendStatus(400);
  }
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    //   generate salt and hash pw
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
    return res.status(200).json(newUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
