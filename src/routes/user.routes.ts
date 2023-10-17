import { Router } from "express";
import UserController from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";

export const userRoutes = () => {
  const router = Router();

  router.post("/", new UserController().create);
  router.get("/", authMiddleware, new UserController().list);
  router.get("/me", authMiddleware, new UserController().getById);
  router.put("/", authMiddleware, new UserController().update);
  router.delete("/delete", authMiddleware, new UserController().delete);

  return router;
};
