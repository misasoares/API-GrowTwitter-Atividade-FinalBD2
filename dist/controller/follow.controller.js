"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const follow_service_1 = __importDefault(require("../service/follow.service"));
class FollowController {
    async create(req, res) {
        try {
            const { userID, followedId } = req.body;
            const result = await follow_service_1.default.create({ userID, followedId });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
    async listAllWhoIFollow(req, res) {
        try {
            const { userID } = req.body;
            const result = await follow_service_1.default.listAllWhoIFollow(userID);
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async listWhoFollowMe(req, res) {
        try {
            const { userID } = req.body;
            const result = await follow_service_1.default.listWhoFollowMe(userID);
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async deleteWhoIFollow(req, res) {
        try {
            const { userID } = req.body;
            const { followedId } = req.params;
            const result = await follow_service_1.default.delete({ userID, followedId });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
}
exports.default = FollowController;
