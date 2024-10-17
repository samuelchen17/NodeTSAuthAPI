import { Request, Response, NextFunction, Router } from "express";
import { getAllUsers } from "../controllers/users.controllers";

const usersRouter = (router: Router) => {
  router.get("/users", getAllUsers);
};

export default usersRouter;
