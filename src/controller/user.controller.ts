import { Request, Response } from "express";
import userService from "../service/user.service";

export default class UserController {
  public async list(req: Request, res: Response) {
    try {
      const result = await userService.list();
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { name, email, username, password } = req.body;
      if (!name || !email || !username || !password) {
        return res.status(404).send({
          code: 404,
          message: "Preencha todos os campos.",
        });
      }

      const result = await userService.create({ name, email, username, password });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { userID, name, email, password, username, token } = req.body;

      const result = await userService.update({ userID, name, email, password, username, token });

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return {
          code: 404,
          message: `Não encontrado..`,
        };
      }

      const result = await userService.getById(id);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { userID } = req.body;

      const result = await userService.delete(userID);

      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
