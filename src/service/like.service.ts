import repository from "../database/prisma.database";
import { CreateLikeDto } from "../dtos/like.dto";
import { Like } from "../model/like.model";
import tweetService from "./tweet.service";
import userService from "./user.service";

class LikeService {
  public async create(data: CreateLikeDto) {
    const like = new Like(data.userID, data.tweetId);

    const user = await userService.getById(data.userID);
    const tweet = await tweetService.showUniqueTweet(data.tweetId);

    if (!user) {
      return {
        message: "Usuario não está logado",
      };
    }

    const createLike = await repository.likes.create({
      data: {
        userId: user.id,
        tweetId: tweet!.id,
      },
      include: {
        TweetId: true,
      },
    });

    return {
      message: `O usuário: ${user.username} curtiu o tweet: '${createLike.TweetId.content}' do usuário: ${createLike.TweetId.userId}`,
    };
  }

  public async list() {
    const result = await repository.likes.findMany();

    return result;
  }

  public async listAllLikesByUser(userID: string) {
    const result = await repository.likes.findMany({
      where: {
        userId: userID,
      },
    });
    return result;
  }

  public async delete(id: string) {
    const result = await repository.likes.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export default new LikeService();
