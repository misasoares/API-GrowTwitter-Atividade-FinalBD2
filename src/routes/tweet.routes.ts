import { Router } from "express"
import TweetController from "../controller/tweet.controller"
import authMiddleware from "../middleware/auth.middleware"

export const tweetRoutes = ()=>{
    const router = Router()

    const controller = new TweetController()

    router.post('/', authMiddleware, controller.create)
    router.get('/list-by-user', authMiddleware, controller.listByIdUser )
    router.get('/', authMiddleware, controller.list )
    router.get('/unique-tweet/:idTweet', authMiddleware, controller.showUniqueTweet )
    router.put('/', authMiddleware, controller.update )
    router.delete('/', authMiddleware, controller.delete )
    router.delete('/all',  controller.deleteAll )

    return router
}