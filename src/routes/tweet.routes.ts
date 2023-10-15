import { Router } from "express"
import TweetController from "../controller/tweet.controller"
import authMiddleware from "../middleware/auth.middleware"

export const tweetRoutes = ()=>{
    const router = Router()

    router.post('/create', authMiddleware, new TweetController().create)
    router.get('/list/:userId', authMiddleware, new TweetController().listByIdUser )
    router.get('/list', authMiddleware, new TweetController().list )

    return router
}