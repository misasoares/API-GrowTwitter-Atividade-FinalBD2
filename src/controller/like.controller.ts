import { Request, Response } from "express";
import likeService from "../service/like.service";

export default class LikeController {
  public async create(req: Request, res: Response) {
    try {
      const { userID, tweetId } = req.body;

      const result = await likeService.create({ userID, tweetId });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const result = await likeService.list();

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async listAllLikesByUser(req: Request, res: Response) {
    try {
      const { userID } = req.body;
      const result = await likeService.listAllLikesByUser(userID);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { userID } = req.body;
      const { id } = req.params;
   
      const result = await likeService.delete({id, userID});

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
