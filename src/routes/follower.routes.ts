import { Router } from "express";
import FollowController from "../controller/follow.controller";
import authMiddleware from "../middleware/auth.middleware";

export const followRoutes = () => {
  const router = Router();
  const controller = new FollowController()

  router.post("/", authMiddleware, controller.create);
  router.get("/listAllWhoIFollow", authMiddleware, controller.listAllWhoIFollow);
  router.get("/listWhoFollowMe", authMiddleware, controller.listWhoFollowMe);
  router.delete('/delete/:followedId', authMiddleware, controller.deleteWhoIFollow)
  
  return router;
};
