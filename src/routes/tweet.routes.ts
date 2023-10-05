import { Router } from "express"
import TweetController from "../controller/tweet.controller"

export const tweetRoutes = ()=>{
    const router = Router()

    router.post('/create/:userId', new TweetController().create)
    router.get('/list/:userId', new TweetController().listByIdUser )

    return router
}