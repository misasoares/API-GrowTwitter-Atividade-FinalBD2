import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

export const authRoutes = () => {
  const router = Router();
  const controller = new AuthController()

  router.post("/login", controller.login);
  router.get("/logout", authMiddleware, controller.logout);

  return router;
};
