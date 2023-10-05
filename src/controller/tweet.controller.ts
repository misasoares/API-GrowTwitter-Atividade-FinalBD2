import { Request, Response } from "express";
import tweetService from "../service/tweet.service";

export default class TweetController {
  public async listByIdUser(req: Request, res: Response) {
    const { userId } = req.params;
    const result = await tweetService.listByIdUser(userId);

    return res.status(200).send(result)
  }

  public async create(req: Request, res: Response) {
    const { userId } = req.params;
    const { content, type } = req.body;

    const result = await tweetService.create({ content, type, userId });

    return res.status(200).send(result);
  }
}
