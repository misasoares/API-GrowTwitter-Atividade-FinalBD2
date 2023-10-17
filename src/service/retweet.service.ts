import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { DeleteRetweetDto, RetweetCreateDto, UpdateRetweetDto } from "../dtos/retweet.dto";
import { Retweet } from "../model/retweet.model";
import userService from "./user.service";

class RetweetService {
  public async create(data: RetweetCreateDto): Promise<ResponseDto> {
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

    return {
      code: 201,
      message: `Você retweetou '${createdRetweet.content}' no tweet '${createdRetweet.Tweet.content}'.`,
      data: createdRetweet,
    };
  }

  public async list(): Promise<ResponseDto> {
    const result = await repository.retweet.findMany();

    return {
      code: 200,
      message: `Lista de todos os retweets:`,
      data: result,
    };
  }

  public async update(data: UpdateRetweetDto): Promise<ResponseDto> {
    const result = await repository.retweet.update({
      where: {
        id: data.id,
        userId: data.userID,
      },
      data: {
        content: data.content,
      },
    });
    return {
      code: 200,
      message: `Você alterou o seu retweet. novo tweet: '${result.content}'`,
      data: result,
    };
  }

  public async delete(data: DeleteRetweetDto): Promise<ResponseDto> {
    const result = await repository.retweet.delete({
      where: {
        id: data.id,
        userId: data.userID,
      },
      include: {
        Tweet: {
          select: {
            content: true,
          },
        },
      },
    });

    return {
      code: 200,
      message: `Você apagou seu retweet '${result.content} do tweet '${result.Tweet.content}'`,
      data: result,
    };
  }

  public async listByUserId(userID: string): Promise<ResponseDto> {
    const result = await repository.retweet.findMany({
      where: {
        userId: userID,
      },
      include: {
        User: {
          select: {
            username: true,
          },
        },
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
      code: 200,
      message: `Lista de todos os retweets do ${result[0].User.username}`,
      data: result,
    };
  }
}
export default new RetweetService();
