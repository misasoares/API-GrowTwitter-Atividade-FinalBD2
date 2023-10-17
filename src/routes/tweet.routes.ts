import { Router } from "express"
import TweetController from "../controller/tweet.controller"
import authMiddleware from "../middleware/auth.middleware"

export const tweetRoutes = ()=>{
    const router = Router()

    router.post('/create', authMiddleware, new TweetController().create)
    router.get('/list-by-user', authMiddleware, new TweetController().listByIdUser )
    router.get('/', authMiddleware, new TweetController().list )
    router.get('/unique-tweet/:idTweet', authMiddleware, new TweetController().showUniqueTweet )
    router.put('/', authMiddleware, new TweetController().update )
    router.delete('/', authMiddleware, new TweetController().delete )

    return router
}