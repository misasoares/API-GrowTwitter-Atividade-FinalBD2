import repository from "../database/prisma.database";
import { RetweetCreateDto } from "../dtos/retweet.dto";
import { Retweet } from "../model/retweet.model";
import userService from "./user.service";

class RetweetService {
  public async create(data: RetweetCreateDto) {
    const retweet = new Retweet(data.content, data.tweetId, data.tokenAsString);

    const user = await userService.getUserByToken(data.tokenAsString);

    if (!user) {
      return {
        message: "Usuario não contrado",
      };
    }

    const createdRetweet = await repository.retweet.create({
      data: {
        content: retweet.content,
        tweetId: retweet.tweetId,
        userId: user.id!,
      },
      include: {
        Tweet: {
          select: {
            content: true,
          },
        },
      },
    });

    return createdRetweet;
  }
}
export default new RetweetService();
