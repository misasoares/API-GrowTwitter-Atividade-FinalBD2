"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tweet_service_1 = __importDefault(require("../service/tweet.service"));
class TweetController {
    async list(req, res) {
        try {
            const result = await tweet_service_1.default.list();
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async listByIdUser(req, res) {
        try {
            const { userID } = req.body;
            const result = await tweet_service_1.default.listByIdUser(userID);
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async create(req, res) {
        try {
            const { content, type, userID } = req.body;
            const result = await tweet_service_1.default.create({ content, type, userID });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async update(req, res) {
        try {
            const { id, userID, content } = req.body;
            const result = await tweet_service_1.default.update({ id, userID, content });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async deleteAll(req, res) {
        try {
            const result = await tweet_service_1.default.deleteAll();
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async delete(req, res) {
        try {
            const { id, userID } = req.body;
            const result = await tweet_service_1.default.delete({ id, userID });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async showUniqueTweet(req, res) {
        try {
            const { idTweet } = req.params;
            const result = await tweet_service_1.default.showUniqueTweet(idTweet);
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
}
exports.default = TweetController;
