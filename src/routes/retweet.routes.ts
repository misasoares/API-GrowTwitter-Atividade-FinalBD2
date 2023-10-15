import { Router } from "express"
import TweetController from "../controller/tweet.controller"
import RetweetController from "../controller/retweet.controller"
import authMiddleware from "../middleware/auth.middleware"

export const retweetRoutes = ()=>{
    const router = Router()

    router.post('/create',authMiddleware, new RetweetController().create)
   

    return router
}