import { Request, Response } from "express";
import userService from "../service/user.service";
import { v4 as uuid } from "uuid";
export class AuthController {
  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const user = await userService.getByUsernameAndPassword(username, password);

      if (!user) {
        return res.status(401).send({ message: "Username ou senha incorretos." });
      }

      const token = uuid();

      const update = await userService.update({ ...user, token: token });

      return res.status(200).send(update);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  public async logout(req: Request, res: Response) {
    try {
      const { userID } = req.body;

      const user = await userService.getById(userID);

      const logout = await userService.update({ ...user, token: null });

      return res.status(200).send({ mesasge: "Usuário desconectado." });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
