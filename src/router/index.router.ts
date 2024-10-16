import { Router } from "express";
import auth from "./auth.router";

const router: Router = Router();

export default (): Router => {
  auth(router);

  return router;
};
