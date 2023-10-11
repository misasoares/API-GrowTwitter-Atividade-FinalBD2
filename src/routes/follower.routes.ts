import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import LikeController from "../controller/like.controller";
import FollowerController from "../controller/follower.controller";

export const followerRoutes = () => {
  const router = Router();

  router.post("/create", new FollowerController().create);


  return router;
};
