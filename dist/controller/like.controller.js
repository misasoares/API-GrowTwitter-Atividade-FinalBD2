"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const like_service_1 = __importDefault(require("../service/like.service"));
class LikeController {
    async create(req, res) {
        try {
            const { userID, tweetId, retweetId } = req.body;
            const result = await like_service_1.default.create({ userID, tweetId, retweetId });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
    async list(req, res) {
        try {
            const result = await like_service_1.default.list();
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async listAllLikesByUser(req, res) {
        try {
            const { userID } = req.body;
            const result = await like_service_1.default.listAllLikesByUser(userID);
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async delete(req, res) {
        try {
            const { userID } = req.body;
            const { id } = req.params;
            const result = await like_service_1.default.delete({ id, userID });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
}
exports.default = LikeController;
