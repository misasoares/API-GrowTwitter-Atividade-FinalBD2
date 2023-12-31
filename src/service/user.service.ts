import repository from "../database/prisma.database";
import { ResponseDto } from "../dtos/response.dto";
import { CreateUserDto, UserUpdateDto } from "../dtos/user.dto";
import { User } from "../model/user.model";
const bcrypt = require("bcrypt");

class UserService {
  public async list(): Promise<ResponseDto> {
    const data = await repository.user.findMany();
    return {
      code: 200,
      message: `Lista de todos os usuários:`,
      data: data,
    };
  }

  public async create(data: CreateUserDto): Promise<ResponseDto> {
    if (data.username!.length > 20) {
      return {
        code: 400,
        message: `Username excedeu o limite de characteres.`,
      };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = new User(data.name, data.email, data.username, hashedPassword);

    const createdUser = await repository.user.create({
      data: {
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
      },
    });

    return {
      code: 201,
      message: `Usuário criado com sucesso.`,
      data: createdUser,
    };
  }

  public async getByUsernameAndPassword(username: string, password: string): Promise<ResponseDto> {
    const user = await repository.user.findUnique({
      where: {
        username: username,
      },
    });
    const isPasswordValid = await bcrypt.compare(password, user!.password);

    if (!isPasswordValid) {
      return {
        code: 404,
        message: "Username ou senha incorretos.",
      };
    }
    return {
      code: 200,
      message: `Sucesso.`,
      data: user,
    };
  }

  public async update(data: UserUpdateDto): Promise<ResponseDto> {
    const user = await repository.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (data.username!.length > 10) {
      return {
        code: 400,
        message: `Username excedeu o limite de characteres.`,
      };
    }

    if (!user) {
      return {
        code: 404,
        message: `Usuário não encontrado.`,
      };
    }

    const updatedUser = await repository.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        username: data.username,
      },
    });

    return {
      code: 200,
      message: "Usuário atualizado com sucesso.",
      data: updatedUser,
    };
  }

  public async getById(id: string): Promise<ResponseDto> {

    const result = await repository.user.findUnique({
      where: {
        id,
      },
    });

    return {
      code: 200,
      message: `Sucesso.`,
      data: result,
    };
  }

  public async delete(id: string): Promise<ResponseDto> {
    const user = await repository.user.findUnique({
      where: {
        id,
      },
    });

    const result = await repository.user.delete({
      where: {
        id: user!.id,
      },
    });

    return {
      code: 200,
      message: `Usuário deletado com sucesso.`,
      data: result,
    };
  }
}

export default new UserService();
