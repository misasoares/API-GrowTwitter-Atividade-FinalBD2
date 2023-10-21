import { Router } from "express";
import UserController from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";

export const userRoutes = () => {
  const router = Router();
  const controller = new UserController()

  router.post("/", controller.create);
  router.get("/", authMiddleware, controller.list);
  router.get("/me", authMiddleware, controller.getById);
  router.get("/:id", controller.getAllById);
  router.put("/", authMiddleware, controller.update);
  router.delete("/delete", authMiddleware, controller.delete);

  return router;
};
