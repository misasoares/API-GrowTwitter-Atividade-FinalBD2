import { Request, Response } from "express";
import userService from "../service/user.service";

export default class UserController {

    public async list (req:Request, res:Response){
        const result = await userService.list()
        return res.status(200).send(result)
    }

    public async create(req:Request, res:Response){
        const { name, email, username,password} = req.body

        const result = await userService.create({name, email, username, password})
        return res.status(200).send(result)
    }
}