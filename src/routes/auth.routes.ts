import { Router } from "express";
import { AuthController } from "../controller/auth.controller";

export const authRoutes = () => {
  const router = Router();

  router.post("/login", new AuthController().login);
  router.get("/logout", new AuthController().logout);

  return router;
};
