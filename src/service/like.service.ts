import repository from "../database/prisma.database";
import { CreateLikeDto } from "../dtos/like.dto";
import { Like } from "../model/like.model";
import tweetService from "./tweet.service";
import userService from "./user.service";

class LikeService {
  public async create(data: CreateLikeDto) {
    const like = new Like(data.tokenAsString, data.tweetId);

    const user = await userService.getUserByToken(data.tokenAsString);
    const tweet = await tweetService.showTweet(data.tweetId);

    if (!user) {
      return {
        message: "Usuario não está logado",
      };
    }

    const createLike = await repository.likes.create({
      data: {
        userId: user.id,
        tweetId: tweet!.id,
      },include:{
        TweetId:true
      }
    });

    return {
      message:`O usuário: ${user.username} curtiu o tweet: '${createLike.TweetId.content}' do usuário: ${createLike.TweetId.userId}`
    }
  }
}

export default new LikeService();
