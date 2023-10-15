import repository from "../database/prisma.database";
import { FollowerDto } from "../dtos/follower.dto";
import { Followed } from "../model/follower.model";
import userService from "./user.service";

class FollowService {
  public async create(data: FollowerDto) {
    const findUser = await userService.getById(data.userID);

    const findFollowed = await userService.getById(data.followedId);
    if (!findUser || !findFollowed) {
      return { message: "não encontrou o usuario" };
    }
    //TO DO - VALIDAÇÕES SE ACHAR OU NÃO AMBOS USUARIOS

    const newFollower = new Followed(findUser!.id, findFollowed!.id);

    const createFollower = await repository.follower.create({
      data: {
        userId: newFollower.idUsuario,
        followedId: newFollower.idFollowed,
      },
    });

    return createFollower;
  }

  public async listAllWhoIFollow(userID: string) {
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
    return result;
  }

  public async listWhoFollowMe(userID: string) {
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

    return result;
  }

  public async delete(data: FollowerDto) {
    const result = await repository.follower.delete({
      where: {
        userId: data.userID,
        followedId: data.followedId,
      },
    });

    return result;
  }
}

export default new FollowService();
