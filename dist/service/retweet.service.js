"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_database_1 = __importDefault(require("../database/prisma.database"));
const retweet_model_1 = require("../model/retweet.model");
class RetweetService {
    async create(data) {
        const retweet = new retweet_model_1.Retweet(data.content, data.tweetId, data.userID);
        const createdRetweet = await prisma_database_1.default.retweet.create({
            data: {
                content: retweet.content,
                tweetId: retweet.tweetId,
                userId: data.userID,
            },
            include: {
                Tweet: {
                    select: {
                        content: true,
                    },
                },
            },
        });
        return {
            code: 201,
            message: `Você retweetou '${createdRetweet.content}' no tweet '${createdRetweet.Tweet.content}'.`,
            data: createdRetweet,
        };
    }
    async list() {
        const result = await prisma_database_1.default.retweet.findMany();
        return {
            code: 200,
            message: `Lista de todos os retweets:`,
            data: result,
        };
    }
    async update(data) {
        const result = await prisma_database_1.default.retweet.update({
            where: {
                id: data.id,
                userId: data.userID,
            },
            data: {
                content: data.content,
            },
        });
        return {
            code: 200,
            message: `Você alterou o seu retweet. novo tweet: '${result.content}'`,
            data: result,
        };
    }
    async delete(data) {
        const result = await prisma_database_1.default.retweet.delete({
            where: {
                id: data.id,
                userId: data.userID,
            },
            include: {
                Tweet: {
                    select: {
                        content: true,
                    },
                },
            },
        });
        return {
            code: 200,
            message: `Você apagou seu retweet '${result.content} do tweet '${result.Tweet.content}'`,
            data: result,
        };
    }
    async listByUserId(userID) {
        const result = await prisma_database_1.default.retweet.findMany({
            where: {
                userId: userID,
            },
            include: {
                User: {
                    select: {
                        username: true,
                    },
                },
                Tweet: {
                    select: {
                        content: true,
                        User: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
            },
        });
        return {
            code: 200,
            message: `Lista de todos os retweets do ${result[0].User.username}`,
            data: result,
        };
    }
    async showUniqueRetweet(id) {
        const result = await prisma_database_1.default.retweet.findUnique({
            where: {
                id
            }
        });
        return {
            code: 200,
            message: "Retweet encontrado com sucesso.",
            data: result
        };
    }
}
exports.default = new RetweetService();
