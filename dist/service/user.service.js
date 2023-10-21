"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_database_1 = __importDefault(require("../database/prisma.database"));
const user_model_1 = require("../model/user.model");
const bcrypt = require("bcrypt");
class UserService {
    async list() {
        const data = await prisma_database_1.default.user.findMany();
        return {
            code: 200,
            message: `Lista de todos os usuários:`,
            data: data,
        };
    }
    async create(data) {
        console.log(data);
        if (data.username.length > 10) {
            return {
                code: 400,
                message: `Username excedeu o limite de characteres.`,
            };
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        const user = new user_model_1.User(data.name, data.email, data.username, hashedPassword);
        const createdUser = await prisma_database_1.default.user.create({
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
    async getByUsernameAndPassword(username, password) {
        const user = await prisma_database_1.default.user.findUnique({
            where: {
                username: username,
            },
        });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                code: 404,
                message: "Username ou senha incorretos."
            };
        }
        return {
            code: 200,
            message: `Sucesso.`,
            data: user,
        };
    }
    async getUserByToken(token) {
        const user = await prisma_database_1.default.user.findUnique({
            where: {
                token: token,
            },
        });
        return {
            code: 200,
            message: `Sucesso.`,
            data: user,
        };
    }
    async update(data) {
        const user = await prisma_database_1.default.user.findUnique({
            where: {
                username: data.username,
            },
        });
        if (data.username.length > 10) {
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
        const updatedUser = await prisma_database_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                username: data.username,
                token: data.token,
            },
        });
        return {
            code: 200,
            message: "Usuário atualizado com sucesso.",
            data: updatedUser,
        };
    }
    async getById(id) {
        const result = await prisma_database_1.default.user.findUnique({
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
    async delete(id) {
        const user = await prisma_database_1.default.user.findUnique({
            where: {
                id,
            },
        });
        const result = await prisma_database_1.default.user.delete({
            where: {
                id: user.id,
            },
        });
        return {
            code: 200,
            message: `Usuário deletado com sucesso.`,
            data: result,
        };
    }
    async getAllByid(id) {
        const user = await prisma_database_1.default.user.findUnique({
            where: {
                id,
            },
        });
        return {
            code: 200,
            message: "Lista de todos os usuarios",
            data: user,
        };
    }
}
exports.default = new UserService();
