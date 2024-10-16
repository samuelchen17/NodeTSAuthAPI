import { Router } from "express";
import { register } from "../controllers/auth.controller";

const auth = (router: Router) => {
  router.post("/auth/register", register);
};

export default auth;

// const router = Router();
// router.post("/auth/register", register);
// export default router;
