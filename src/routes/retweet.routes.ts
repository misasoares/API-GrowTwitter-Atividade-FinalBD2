import { Router } from "express"
import TweetController from "../controller/tweet.controller"
import RetweetController from "../controller/retweet.controller"

export const retweetRoutes = ()=>{
    const router = Router()

    router.post('/create', new RetweetController().create)
   

    return router
}