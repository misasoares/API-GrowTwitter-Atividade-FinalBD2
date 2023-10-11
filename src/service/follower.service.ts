import repository from "../database/prisma.database";
import { CreateFollowerDto } from "../dtos/follower.dto";
import { Follower } from "../model/follower.model";
import userService from "./user.service";

class FollowerService {
  public async create(data: CreateFollowerDto) {
    const newFollower = new Follower(data.tokenAsString, data.followerId);

    const findUser = await userService.getUserByToken(data.tokenAsString);
    const findFollower = await userService.getById(data.followerId);

    const createFollower = await repository.follower.create({
      data: {
        userId: findUser!.id,
        followerId: findFollower!.id,
      },select:{
        User:{
          select:{
            username:true
          },
        },
        Follower:{
          select:{
            username:true
          }
        }
      }
      
    });
    //to do return e controller
    return {
      message:`O usuário: '${createFollower.User.username}' começou a seguir o usuário '${createFollower.Follower.username}'`
    }
  }
}

export default new FollowerService();
