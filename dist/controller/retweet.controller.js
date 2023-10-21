"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const retweet_service_1 = __importDefault(require("../service/retweet.service"));
class RetweetController {
    async create(req, res) {
        try {
            const { content, tweetId, userID } = req.body;
            const result = await retweet_service_1.default.create({ content, tweetId, userID });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
    async list(req, res) {
        try {
            const result = await retweet_service_1.default.list();
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async update(req, res) {
        try {
            const { id, userID, content } = req.body;
            const result = await retweet_service_1.default.update({ id, userID, content });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async delete(req, res) {
        try {
            const { id, userID } = req.body;
            const result = await retweet_service_1.default.delete({ id, userID });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async listByUserId(req, res) {
        try {
            const { userID } = req.body;
            const result = await retweet_service_1.default.listByUserId(userID);
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
}
exports.default = RetweetController;
