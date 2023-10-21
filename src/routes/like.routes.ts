import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import LikeController from "../controller/like.controller";
import authMiddleware from "../middleware/auth.middleware";

export const likeRoutes = () => {
  const router = Router();
  const controller = new LikeController()

  router.post("/", authMiddleware, controller.create);
  router.get("/list", authMiddleware, controller.list)
  router.get("/listAllLikesByUser", authMiddleware, controller.listAllLikesByUser)
  router.delete("/:id", authMiddleware, controller.delete)


  return router;
};
