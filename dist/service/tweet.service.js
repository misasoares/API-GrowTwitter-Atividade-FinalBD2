"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_database_1 = __importDefault(require("../database/prisma.database"));
const tweet_model_1 = require("../model/tweet.model");
class TweetService {
    async list() {
        const result = await prisma_database_1.default.tweet.findMany();
        return {
            code: 200,
            message: `Lista de todos os tweets:`,
            data: result,
        };
    }
    async listByIdUser(userID) {
        const data = await prisma_database_1.default.tweet.findMany({
            where: {
                userId: userID,
            },
            include: {
                User: {
                    select: {
                        username: true,
                    }
                },
            }
        });
        return {
            code: 200,
            message: `Lista de todos os tweets do usuário: ${data[0].User.username}`,
            data: data
        };
    }
    async create(data) {
        const tweet = new tweet_model_1.Tweet(data.content, data.type, data.userID);
        const createdTweet = await prisma_database_1.default.tweet.create({
            data: {
                content: tweet.content,
                type: tweet.type,
                userId: data.userID,
            },
        });
        return {
            code: 201,
            message: `Você tweetou: '${createdTweet.content}'`,
            data: createdTweet
        };
    }
    async showUniqueTweet(id) {
        const result = await prisma_database_1.default.tweet.findUnique({
            where: {
                id,
            },
        });
        return {
            code: 200,
            message: `Mostrar apenas um tweet:`,
            data: result
        };
    }
    async update(data) {
        const result = await prisma_database_1.default.tweet.update({
            where: {
                userId: data.userID,
                id: data.id,
            },
            data: {
                content: data.content,
            }, include: {
                User: {
                    select: {
                        username: true
                    }
                }
            }
        });
        return {
            code: 200,
            message: `Tweet atualizado com sucesso.`,
            data: result
        };
    }
    async deleteAll() {
        const result = await prisma_database_1.default.tweet.deleteMany();
        return {
            code: 200,
            message: `Tweets deletados com sucesso.`,
            data: result
        };
    }
    async delete(data) {
        const result = await prisma_database_1.default.tweet.delete({
            where: {
                userId: data.userID,
                id: data.id,
            },
        });
        return {
            code: 200,
            message: `Tweet deletado com sucesso.`,
            data: result
        };
    }
}
exports.default = new TweetService();
