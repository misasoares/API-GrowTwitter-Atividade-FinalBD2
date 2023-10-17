import repository from "../database/prisma.database";
import { FollowerDto } from "../dtos/follower.dto";
import { ResponseDto } from "../dtos/response.dto";
import { Followed } from "../model/follower.model";
import userService from "./user.service";

class FollowService {
  public async create(data: FollowerDto): Promise<ResponseDto> {
    const findUser = await userService.getById(data.userID);

    const findFollowed = await userService.getById(data.followedId);
    if (!findUser || !findFollowed) {
      return {
        code: 404,
        message: "não encontrou o usuario",
      };
    }
    //TO DO - VALIDAÇÕES SE ACHAR OU NÃO AMBOS USUARIOS

    const newFollower = new Followed(findUser!.data.id, findFollowed!.data.id);

    const createFollower = await repository.follower.create({
      data: {
        userId: newFollower.idUsuario,
        followedId: newFollower.idFollowed,
      },
    });

    return {
      code: 201,
      message: `O usuário ${findUser.data.username} seguiu ${findFollowed.data.username}.`,
      data: createFollower,
    };
  }

  public async listAllWhoIFollow(userID: string): Promise<ResponseDto> {
    const result = await repository.follower.findMany({
      where: {
        userId: userID,
      },
      include: {
        Followed: {
          select: {
            username: true,
          },
        },
      },
    });
    return {
      code: 200,
      message: `Lista de usuários que eu sigo:`,
      data: result,
    };
  }

  public async listWhoFollowMe(userID: string): Promise<ResponseDto> {
    const result = await repository.follower.findMany({
      where: {
        followedId: userID,
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
      message: `Lista de usuários que me seguem:`,
      data: result,
    };
  }

  public async delete(data: FollowerDto): Promise<ResponseDto> {
    const result = await repository.follower.delete({
      where: {
        userId: data.userID,
        followedId: data.followedId,
      },
    });

    const userUnfollowed = await repository.user.findUnique({
      where: {
        id: data.followedId,
      },
    });

    if (!userUnfollowed) {
      return {
        code: 404,
        message: "Usuário não encontrado",
      };
    }

    return {
      code: 200,
      message: `Você parou de seguir o usuário ${userUnfollowed.username}`,
      data: result,
    };
  }
}

export default new FollowService();
