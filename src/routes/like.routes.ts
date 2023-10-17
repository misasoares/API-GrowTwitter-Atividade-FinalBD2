import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import LikeController from "../controller/like.controller";
import authMiddleware from "../middleware/auth.middleware";

export const likeRoutes = () => {
  const router = Router();

  router.post("/", authMiddleware, new LikeController().create);
  router.get("/list", authMiddleware, new LikeController().list)
  router.get("/listAllLikesByUser", authMiddleware, new LikeController().listAllLikesByUser)
  router.delete("/:id", authMiddleware, new LikeController().delete)


  return router;
};
