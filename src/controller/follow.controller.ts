import { Request, Response } from "express";
import followService from "../service/follow.service";

export default class FollowController {
  public async create(req: Request, res: Response) {
    try {
      const { userID, followedId } = req.body;

      const result = await followService.create({ userID, followedId });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async listAllWhoIFollow(req: Request, res: Response) {
    try {
      const { userID } = req.body;

      const result = await followService.listAllWhoIFollow(userID);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async listWhoFollowMe(req: Request, res: Response) {
    try {
      const { userID } = req.body;

      const result = await followService.listWhoFollowMe(userID);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async deleteWhoIFollow(req: Request, res: Response) {
    try {
      const { userID, followedId } = req.body;

      const result = await followService.delete({ userID, followedId });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
