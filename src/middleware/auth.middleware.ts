import { NextFunction, Request, Response } from "express";
import userService from "../service/user.service";
import { verify } from "jsonwebtoken";
import { env } from "process";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        code: 401,
        message: "Authentication token fail",
      });
    }

    const [,token] = authHeader.split(" ")

    verify(token, `${process.env.JWT_SECRET}`, async(err:any, user:any)=>{
      if (err) return res.status(401).json({ message: `Erro no verify: ${err}` });

      req.user = user.result;

    })

    next();
  } catch (error) {
    return res.status(500).send({
      code: 500,
      message: error,
    });
  }
}

export default authMiddleware;
