import { Request, Response, NextFunction, Router } from "express";
import { deleteUser, getAllUsers } from "../controllers/users.controllers";
import { isAuthenticated } from "../middlewares/index.middlewares";

const usersRouter = (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", deleteUser);
};

export default usersRouter;
