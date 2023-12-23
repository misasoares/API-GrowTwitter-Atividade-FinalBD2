import { Router } from "express";
import UserController from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";

export const userRoutes = () => {
  const router = Router();
  const controller = new UserController()

  router.post("/", controller.create);
  router.get("/", controller.list);
  router.get("/:id", controller.getById);
  router.put("/", authMiddleware, controller.update);
  router.delete("/delete", authMiddleware, controller.delete);

  return router;
};
