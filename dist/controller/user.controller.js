"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../service/user.service"));
class UserController {
    async list(req, res) {
        try {
            const result = await user_service_1.default.list();
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async create(req, res) {
        try {
            const { name, email, username, password } = req.body;
            const result = await user_service_1.default.create({ name, email, username, password });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async update(req, res) {
        try {
            const { userID, name, email, password, username, token } = req.body;
            const result = await user_service_1.default.update({ userID, name, email, password, username, token });
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async getById(req, res) {
        try {
            const { userID } = req.body;
            const result = await user_service_1.default.getById(userID);
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async getAllById(req, res) {
        try {
            const { id } = req.params;
            const result = await user_service_1.default.getAllByid(id);
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
    async delete(req, res) {
        try {
            const { userID } = req.body;
            const result = await user_service_1.default.delete(userID);
            return res.status(200).send(result);
        }
        catch (error) {
            return res.status(500).send(error);
        }
    }
}
exports.default = UserController;
