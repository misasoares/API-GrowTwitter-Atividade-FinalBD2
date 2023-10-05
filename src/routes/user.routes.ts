import { Router } from "express";
import UserController from "../controller/user.controller";

export const userRoutes = () => {
  const router = Router();

  router.get("/list", new UserController().list);
  router.post("/create", new UserController().create);

  return router;
};
