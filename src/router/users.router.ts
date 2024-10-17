import { Router } from "express";
import { deleteUser, getAllUsers } from "../controllers/users.controllers";
import { isAuthenticated, isOwner } from "../middlewares/index.middlewares";

const usersRouter = (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
};

export default usersRouter;
