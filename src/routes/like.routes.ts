import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import LikeController from "../controller/like.controller";

export const likeRoutes = () => {
  const router = Router();

  router.post("/create", new LikeController().create);


  return router;
};
