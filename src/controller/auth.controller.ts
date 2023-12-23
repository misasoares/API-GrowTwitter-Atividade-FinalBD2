import { Request, Response } from "express";
import userService from "../service/user.service";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(404).send({
          code: 404,
          message: "Preencha todos os campos.",
        });
      }

      const user = await userService.getByUsernameAndPassword(username, password);

      if (!user) {
        return res.status(401).send({ message: "Username ou senha incorretos." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.data.password);

      if (!isPasswordValid) {
        return res.status(401).send({ message: "Username ou senha incorretos." });
      }

      const token = jwt.sign({ user }, `${process.env.JWT_SECRET}`);

      return res.status(200).send({ user: user, token });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async logout(req: Request, res: Response) {
    try {
      const { userID } = req.body;

      const user = await userService.getById(userID);

      const logout = await userService.update({ ...user, token: null });

      return res.status(200).send(logout);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
