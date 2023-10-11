import { Request, Response } from "express";
import likeService from "../service/like.service";

export default class LikeController {
  public async create(req: Request, res: Response) {
    try {
      const { token } = req.headers;
      const tokenAsString = token as string;
      const { tweetId } = req.body;

      const result = await likeService.create({ tokenAsString, tweetId });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
