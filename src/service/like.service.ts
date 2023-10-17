import repository from "../database/prisma.database";
import { CreateLikeDto, DeleteLikeDto } from "../dtos/like.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Like } from "../model/like.model";
import tweetService from "./tweet.service";
import userService from "./user.service";

class LikeService {
  public async create(data: CreateLikeDto): Promise<ResponseDto> {
    const like = new Like(data.userID, data.tweetId);

    const user = await userService.getById(data.userID);
    const tweet = await tweetService.showUniqueTweet(data.tweetId);

    if (!user) {
      return {
        code: 404,
        message: "Usuario não está logado",
      };
    }

    if (!tweet) {
      return {
        code: 404,
        message: "Tweet não encontrado.",
      };
    }

    const createLike = await repository.likes.create({
      data: {
        userId: user.id,
        tweetId: tweet.id,
      },
      include: {
        TweetId: true,
      },
    });

    const userWhoTweeted = await repository.user.findUnique({
      where: {
        id: createLike.TweetId.userId,
      },
    });

    return {
      code: 201,
      message: `Você curtiu o tweet: '${createLike.TweetId.content}' do usuário ${userWhoTweeted!.username}`,
      data: createLike,
    };
  }

  public async list(): Promise<ResponseDto> {
    const result = await repository.likes.findMany();

    return {
      code: 200,
      message: `Lista de todos os likes:`,
      data: result,
    };
  }

  public async listAllLikesByUser(userID: string): Promise<ResponseDto> {
    const result = await repository.likes.findMany({
      where: {
        userId: userID,
      },
      include: {
        TweetId: {
          select: {
            content: true,
          },
        },
      },
    });
    return {
      code: 200,
      message: `Lista de todos os tweets que você curtiu:`,
      data: result,
    };
  }

  public async delete(data: DeleteLikeDto): Promise<ResponseDto> {
    
    const result = await repository.likes.delete({
      where: {
        id: data.id,
        userId: data.userID,
      },
      include: {
        TweetId: {
          select: {
            content: true,
          },
        },
      },
    });

    return {
      code: 200,
      message: `Você descurtiu esse tweet.`,
      data: result,
    };
  }
}

export default new LikeService();
