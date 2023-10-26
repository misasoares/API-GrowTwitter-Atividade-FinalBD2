import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateTweet, DeleteTweetDto, UpdateTweetDto } from "../dtos/tweet.dto";
import { Tweet } from "../model/tweet.model";

class TweetService {
  public async list(userID: string): Promise<ResponseDto> {
    const result = await repository.tweet.findMany({
      include: {
        User: {
          select: {
            id: true,
            username: true,
            name: true,
            LikesToUser: {
              select: {
                id: true,

                tweetId: true,
                userId: true,
              },
              where: {
                userId: userID,
              },
            },
          },
        },
        Likes: {
          select: {
            id: true,
            userId: true,
            tweetId: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return {
      code: 200,
      message: `Lista de todos os tweets:`,
      data: result,
    };
  }
  public async listByIdUser(userID: string): Promise<ResponseDto> {
    const data = await repository.tweet.findMany({
      where: {
        userId: userID,
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });
    return {
      code: 200,
      message: `Lista de todos os tweets do usuário: ${data[0].User.username}`,
      data: data,
    };
  }

  public async create(data: CreateTweet): Promise<ResponseDto> {
    const tweet = new Tweet(data.content, data.type, data.userID, data.tweetId);

    const createdTweet = await repository.tweet.create({
      data: {
        content: tweet.content,
        type: tweet.type,
        userId: data.userID,
      },
    });

    if (tweet.tweetId) {
      const res = await repository.retweet.create({
        data: {
          retweetId: createdTweet.id,
          tweetId: tweet.tweetId,
        },
        include: {
          Tweet: {
            select: {
              content: true,
              User: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      
      return {
        code: 201,
        message: `Você retweetou: '${createdTweet.content}, no tweet '${res.Tweet?.content} do usuario '${res.Tweet?.User.username}'`,
        data: res,
      };
    }

    return {
      code: 201,
      message: `Você tweetou: '${createdTweet.content}'`,
      data: createdTweet,
    };
  }

  public async showUniqueTweet(id: string, userID: string): Promise<ResponseDto> {
    const result = await repository.tweet.findUnique({
      where: {
        id,
      },
      include: {
        Likes: {
          select: {
            userId: true,
          },
          where: {
            userId: userID,
          },
        },
      },
    });

    return {
      code: 200,
      message: `Mostrar apenas um tweet:`,
      data: result,
    };
  }

  public async update(data: UpdateTweetDto): Promise<ResponseDto> {
    const result = await repository.tweet.update({
      where: {
        userId: data.userID,
        id: data.id,
      },
      data: {
        content: data.content,
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });
    return {
      code: 200,
      message: `Tweet atualizado com sucesso.`,
      data: result,
    };
  }

  public async deleteAll(): Promise<ResponseDto> {
    const result = await repository.tweet.deleteMany();
    return {
      code: 200,
      message: `Tweets deletados com sucesso.`,
      data: result,
    };
  }
  public async delete(data: DeleteTweetDto): Promise<ResponseDto> {
    const result = await repository.tweet.delete({
      where: {
        userId: data.userID,
        id: data.id,
      },
    });
    return {
      code: 200,
      message: `Tweet deletado com sucesso.`,
      data: result,
    };
  }
}

export default new TweetService();
