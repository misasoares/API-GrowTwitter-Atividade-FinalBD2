import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

export const authRoutes = () => {
  const router = Router();

  router.post("/login", new AuthController().login);
  router.get("/logout", authMiddleware, new AuthController().logout);

  return router;
};
