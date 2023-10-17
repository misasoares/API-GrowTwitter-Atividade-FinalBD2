import { Router } from "express"
import TweetController from "../controller/tweet.controller"
import RetweetController from "../controller/retweet.controller"
import authMiddleware from "../middleware/auth.middleware"

export const retweetRoutes = ()=>{
    const router = Router()

    router.post('/',authMiddleware, new RetweetController().create)
    router.get('/', authMiddleware, new RetweetController().list)
    router.put('/', authMiddleware, new RetweetController().update)
    router.delete('/', authMiddleware, new RetweetController().delete)
    router.get('/listar-by-user', authMiddleware, new RetweetController().listByUserId)
   

    return router
}