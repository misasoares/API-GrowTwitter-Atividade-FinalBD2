import { Request, Response } from "express";
import followerService from "../service/follower.service";

export default class FollowerController {
  public async create(req: Request, res: Response) {
    try {
      const { token } = req.headers;
      const tokenAsString = token as string;
      const { followerId } = req.body;

      const result = await followerService.create({tokenAsString, followerId})
   
      return res.status(200).send(result)
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
