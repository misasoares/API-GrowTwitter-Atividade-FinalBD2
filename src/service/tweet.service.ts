import repository from "../database/prisma.database";
import { CreateTweet, DeleteTweetDto, UpdateTweetDto } from "../dtos/tweet.dto";
import { Tweet } from "../model/tweet.model";
import userService from "./user.service";

class TweetService {
  public async list() {
    const result = await repository.tweet.findMany();
    return result;
  }
  public async listByIdUser(userID: string) {
    const data = await repository.tweet.findMany({
      where: {
        userId: userID,
      },
    });
    return data;
  }

  public async create(data: CreateTweet) {
    const tweet = new Tweet(data.content, data.type, data.userID);

    const createdTweet = await repository.tweet.create({
      data: {
        content: tweet.content,
        type: tweet.type,
        userId: data.userID,
      },
    });
    return createdTweet;
  }

  public async showUniqueTweet(id: string) {
    const result = await repository.tweet.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  public async update(data: UpdateTweetDto) {
    const result = await repository.tweet.update({
      where: {
        userId: data.userID,
        id: data.id,
      },
      data: {
        content: data.content,
      },
    });
    return result;
  }

  public async delete(data: DeleteTweetDto) {
    const result = await repository.tweet.delete({
      where: {
        userId: data.userID,
        id: data.id,
      },
    });
    return result;
  }
}

export default new TweetService();
