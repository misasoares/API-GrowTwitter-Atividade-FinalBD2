"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_database_1 = __importDefault(require("../database/prisma.database"));
const like_model_1 = require("../model/like.model");
const retweet_service_1 = __importDefault(require("./retweet.service"));
const tweet_service_1 = __importDefault(require("./tweet.service"));
const user_service_1 = __importDefault(require("./user.service"));
class LikeService {
    async create(data) {
        if (!data.retweetId && !data.tweetId) {
            return {
                code: 404,
                message: "Não foi selecionado nenhum conteudo para curtir.",
            };
        }
        const like = new like_model_1.Like(data.userID, data.tweetId, data.retweetId);
        const user = await user_service_1.default.getById(data.userID);
        if (!user) {
            return {
                code: 404,
                message: "Usuario não está logado",
            };
        }
        if (data.tweetId) {
            const tweet = await tweet_service_1.default.showUniqueTweet(data.tweetId);
            const createLike = await prisma_database_1.default.likes.create({
                data: {
                    userId: user.data.id,
                    tweetId: tweet.data.id,
                },
                include: {
                    TweetId: true,
                },
            });
            if (!createLike) {
                return {
                    code: 500,
                    message: "Não foi possível curtir este tweet.",
                };
            }
            const userWhoTweeted = await prisma_database_1.default.user.findUnique({
                where: {
                    id: createLike.TweetId.userId,
                },
            });
            return {
                code: 201,
                message: `Você curtiu o tweet: '${createLike.TweetId.content}' do usuário ${userWhoTweeted.username}`,
                data: createLike,
            };
        }
        if (data.retweetId) {
            const retweet = await retweet_service_1.default.showUniqueRetweet(data.retweetId);
            if (retweet.code !== 200) {
                return { code: 500, message: "Retweet não encontrado." };
            }
            const createLike = await prisma_database_1.default.likes.create({
                data: {
                    userId: user.data.id,
                    retweetId: retweet.data.id,
                },
                include: {
                    RetweetId: true,
                },
            });
            const userWhoRetweeted = await prisma_database_1.default.user.findUnique({
                where: {
                    id: createLike.RetweetId.userId,
                },
            });
            return {
                code: 201,
                message: `Você curtiu o retweet: '${createLike.RetweetId.content}' do usuário ${userWhoRetweeted.username}`,
                data: createLike,
            };
        }
        return {
            code: 500,
            message: "Não foi possível deixar o seu like, houve algum erro ao localizar o conteudo.",
        };
    }
    async list() {
        const result = await prisma_database_1.default.likes.findMany();
        return {
            code: 200,
            message: `Lista de todos os likes:`,
            data: result,
        };
    }
    async listAllLikesByUser(userID) {
        const result = await prisma_database_1.default.likes.findMany({
            where: {
                userId: userID,
            },
            include: {
                TweetId: {
                    select: {
                        content: true,
                    },
                },
                RetweetId: {
                    select: {
                        content: true,
                    },
                },
            },
        });
        return {
            code: 200,
            message: `Lista de todos os tweets que você curtiu:`,
            data: result,
        };
    }
    async delete(data) {
        const result = await prisma_database_1.default.likes.delete({
            where: {
                id: data.id,
                userId: data.userID,
            },
            include: {
                TweetId: {
                    select: {
                        content: true,
                    },
                },
                RetweetId: {
                    select: {
                        content: true,
                    },
                },
            },
        });
        return {
            code: 200,
            message: `Você descurtiu esse tweet.`,
            data: result,
        };
    }
}
exports.default = new LikeService();
