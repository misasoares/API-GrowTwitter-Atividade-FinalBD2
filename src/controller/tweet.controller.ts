import { Request, Response } from "express";
import tweetService from "../service/tweet.service";

export default class TweetController {
  public async list(req: Request, res: Response) {
    try {
      const result = await tweetService.list();

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async listByIdUser(req: Request, res: Response) {
    try {
      const { userID } = req.body;

      const result = await tweetService.listByIdUser(userID);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { content, type, userID } = req.body;

      const result = await tweetService.create({ content, type, userID });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id, userID, content } = req.body;

      const result = await tweetService.update({ id, userID, content });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async deleteAll(req: Request, res: Response) {
    try {

      const result = await tweetService.deleteAll();

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  public async delete(req: Request, res: Response) {
    try {
      const { id, userID } = req.body;

      const result = await tweetService.delete({ id, userID });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async showUniqueTweet(req: Request, res: Response) {
    try {
      const { idTweet } = req.params;

      const result = await tweetService.showUniqueTweet(idTweet);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
