import { Router } from "express";
import FollowController from "../controller/follow.controller";
import authMiddleware from "../middleware/auth.middleware";

export const followRoutes = () => {
  const router = Router();

  router.post("/create", authMiddleware, new FollowController().create);
  router.get("/listAllWhoIFollow", authMiddleware, new FollowController().listAllWhoIFollow);
  router.get("/listWhoFollowMe", authMiddleware, new FollowController().listWhoFollowMe);
  return router;
};
