import { Request, Response } from "express";
import retweetService from "../service/retweet.service";

export default class RetweetController {
  public async create(req: Request, res: Response) {
    try {
      const { content, tweetId, userID } = req.body;

      const result = await retweetService.create({ content, tweetId, userID });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const result = await retweetService.list();

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id, userID, content } = req.body;

      const result = await retweetService.update({ id, userID, content });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id, userID } = req.body;

      const result = await retweetService.delete({ id, userID });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async listByUserId(req: Request, res: Response) {
    try {
      const { userID } = req.body;

      const result = await retweetService.listByUserId(userID);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
