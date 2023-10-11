import repository from "../database/prisma.database";
import { Tweet } from "../model/tweet.model";
import userService from "./user.service";

class TweetService{


    public async listByIdUser(userId:string){
        const data = await repository.tweet.findMany({
            where:{
                userId: userId
            }
        })
        return data
    }

    public async create(data:any){
        const tweet = new Tweet(data.content, data.type, data.token)
        const user = await userService.getUserByToken(data.token)

        if(user){
            const createdTweet = await repository.tweet.create({
                data:{
                    content: tweet.content,
                    type: tweet.type,
                    userId: user.id
                }
            })
            return createdTweet
        }

        return {
            message:"Você não está online."
        }
        
    }

    public async showTweet(id:string){
        const result = await repository.tweet.findUnique({
            where:{
                id
            }
        })

        return result
    }
}

export default new TweetService()