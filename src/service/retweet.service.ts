import repository from "../database/prisma.database";
import { DeleteRetweetDto, RetweetCreateDto, UpdateRetweetDto } from "../dtos/retweet.dto";
import { Retweet } from "../model/retweet.model";
import userService from "./user.service";

class RetweetService {
  public async create(data: RetweetCreateDto) {
    const retweet = new Retweet(data.content, data.tweetId, data.userID);

    const createdRetweet = await repository.retweet.create({
      data: {
        content: retweet.content,
        tweetId: retweet.tweetId,
        userId: data.userID!,
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

  public async list() {
    const result = await repository.retweet.findMany();

    return result;
  }

  public async update(data: UpdateRetweetDto) {
    const result = await repository.retweet.update({
      where: {
        id: data.id,
        userId: data.userID,
      },
      data: {
        content: data.content,
      },
    });
    return result;
  }

  public async delete(data: DeleteRetweetDto) {
    const result = await repository.retweet.delete({
      where: {
        id: data.id,
        userId: data.userID,
      },
    });

    return result;
  }

  public async listByUserId(userID: string) {
    const result = await repository.retweet.findMany({
      where: {
        userId: userID,
      },
    });

    return result;
  }
}
export default new RetweetService();
