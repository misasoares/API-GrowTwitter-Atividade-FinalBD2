import { Request, Response } from "express";
import retweetService from "../service/retweet.service";

export default class RetweetController {
  public async create(req: Request, res: Response) {
    try {
      const { token } = req.headers;
      const tokenAsString = token as string
      const { content, tweetId } = req.body
        
      const result = await retweetService.create({content,tweetId,tokenAsString})

      return res.status(200).send(result)

    } catch (error) {
        return res.status(400).send(error)
    }
  }
}
