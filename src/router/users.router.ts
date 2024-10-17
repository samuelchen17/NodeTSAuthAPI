import { Request, Response, NextFunction, Router } from "express";
import { getAllUsers } from "../controllers/users.controllers";
import { isAuthenticated } from "../middlewares/index.middlewares";

const usersRouter = (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
};

export default usersRouter;
