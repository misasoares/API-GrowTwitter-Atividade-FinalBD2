"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_database_1 = __importDefault(require("../database/prisma.database"));
const follower_model_1 = require("../model/follower.model");
const user_service_1 = __importDefault(require("./user.service"));
class FollowService {
    async create(data) {
        const findUser = await user_service_1.default.getById(data.userID);
        const findFollowed = await user_service_1.default.getById(data.followedId);
        if (!findUser || !findFollowed) {
            return {
                code: 404,
                message: "não encontrou o usuario",
            };
        }
        //TO DO - VALIDAÇÕES SE ACHAR OU NÃO AMBOS USUARIOS
        const newFollower = new follower_model_1.Followed(findUser.data.id, findFollowed.data.id);
        const createFollower = await prisma_database_1.default.follower.create({
            data: {
                userId: newFollower.idUsuario,
                followedId: newFollower.idFollowed,
            },
        });
        return {
            code: 201,
            message: `O usuário ${findUser.data.username} seguiu ${findFollowed.data.username}.`,
            data: createFollower,
        };
    }
    async listAllWhoIFollow(userID) {
        const result = await prisma_database_1.default.follower.findMany({
            where: {
                userId: userID,
            },
            include: {
                Followed: {
                    select: {
                        username: true,
                    },
                },
            },
        });
        return {
            code: 200,
            message: `Lista de usuários que eu sigo:`,
            data: result,
        };
    }
    async listWhoFollowMe(userID) {
        const result = await prisma_database_1.default.follower.findMany({
            where: {
                followedId: userID,
            },
            include: {
                User: {
                    select: {
                        username: true,
                    },
                },
            },
        });
        return {
            code: 200,
            message: `Lista de usuários que me seguem:`,
            data: result,
        };
    }
    async delete(data) {
        const result = await prisma_database_1.default.follower.delete({
            where: {
                userId: data.userID,
                followedId: data.followedId,
            },
        });
        const userUnfollowed = await prisma_database_1.default.user.findUnique({
            where: {
                id: data.followedId,
            },
        });
        if (!userUnfollowed) {
            return {
                code: 404,
                message: "Usuário não encontrado",
            };
        }
        return {
            code: 200,
            message: `Você parou de seguir o usuário ${userUnfollowed.username}`,
            data: result,
        };
    }
}
exports.default = new FollowService();
