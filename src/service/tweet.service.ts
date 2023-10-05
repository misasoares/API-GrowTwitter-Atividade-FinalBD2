import repository from "../database/prisma.database";
import { Tweet } from "../model/tweet.model";

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
        const tweet = new Tweet(data.content, data.type, data.userId)
        const createdTweet = await repository.tweet.create({
            data:{
                content: tweet.content,
                type: tweet.type,
                userId: tweet.userId
            }
        })
        return createdTweet
    }
}

export default new TweetService()