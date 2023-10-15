import { Router } from "express";
import UserController from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";

export const userRoutes = () => {
  const router = Router();

  router.get("/list", authMiddleware, new UserController().list);
  router.post("/create", new UserController().create);

  return router;
};
