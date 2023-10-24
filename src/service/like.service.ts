import repository from "../database/prisma.database";
import { CreateLikeDto, DeleteLikeDto } from "../dtos/like.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Like } from "../model/like.model";
import retweetService from "./retweet.service";
import tweetService from "./tweet.service";
import userService from "./user.service";

class LikeService {
  public async create(data: CreateLikeDto): Promise<ResponseDto> {
    if (!data.retweetId && !data.tweetId) {
      return {
        code: 404,
        message: "Não foi selecionado nenhum conteudo para curtir.",
      };
    }
    const like = new Like(data.userID, data.tweetId, data.retweetId);

    const user = await userService.getById(data.userID);

    if (!user) {
      return {
        code: 404,
        message: "Usuario não está logado",
      };
    }

    if (data.tweetId) {
      const tweet = await tweetService.showUniqueTweet(data.tweetId, data.userID);

      console.log(data.userID,tweet.data.Like[0].userId)

      // if(data.userID === tweet.data.Like[0].userId){
      //   console.log("oi")
      //   return {
      //     code:400,
      //     message:"Não é possivel curtir duas vezes o mesmo tweet."
      //   }
      // }

      const createLike = await repository.likes.create({
        data: {
          userId: user.data.id,
          tweetId: tweet.data.id,
        },
        include: {
          TweetId: true,
        },
      });

      if (!createLike) {
        return {
          code: 500,
          message: "Não foi possível curtir este tweet.",
        };
      }

      const userWhoTweeted = await repository.user.findUnique({
        where: {
          id: createLike.TweetId!.userId,
        },
      });

      return {
        code: 201,
        message: `Você curtiu o tweet: '${createLike.TweetId!.content}' do usuário ${userWhoTweeted!.username}`,
        data: createLike,
      };
    }

    if (data.retweetId) {
      const retweet = await retweetService.showUniqueRetweet(data.retweetId);

      if (retweet.code !== 200) {
        return { code: 500, message: "Retweet não encontrado." };
      }

      const createLike = await repository.likes.create({
        data: {
          userId: user.data.id,
          retweetId: retweet.data.id,
        },
        include: {
          RetweetId: true,
        },
      });

      const userWhoRetweeted = await repository.user.findUnique({
        where: {
          id: createLike.RetweetId!.userId,
        },
      });
      return {
        code: 201,
        message: `Você curtiu o retweet: '${createLike.RetweetId!.content}' do usuário ${userWhoRetweeted!.username}`,
        data: createLike,
      };
    }

    return {
      code: 500,
      message: "Não foi possível deixar o seu like, houve algum erro ao localizar o conteudo.",
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
        RetweetId: {
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
        RetweetId: {
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
