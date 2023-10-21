import { Router } from "express"
import TweetController from "../controller/tweet.controller"
import RetweetController from "../controller/retweet.controller"
import authMiddleware from "../middleware/auth.middleware"

export const retweetRoutes = ()=>{
    const router = Router()
    const controller = new RetweetController()

    router.post('/',authMiddleware, controller.create)
    router.get('/', authMiddleware, controller.list)
    router.put('/', authMiddleware, controller.update)
    router.delete('/', authMiddleware, controller.delete)
    router.get('/listar-by-user', authMiddleware, controller.listByUserId)
   

    return router
}