"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_service_1 = __importDefault(require("../service/user.service"));
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await user_service_1.default.getByUsernameAndPassword(username, password);
            if (!user) {
                return res.status(401).send({ message: "Username ou senha incorretos." });
            }
            const isPasswordValid = await bcrypt.compare(password, user.data.password);
            if (!isPasswordValid) {
                return res.status(401).send({ message: "Username ou senha incorretos." });
            }
            const token = (0, uuid_1.v4)();
            const update = await user_service_1.default.update({ ...user.data, token: token });
            return res.status(200).send(update);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
    async logout(req, res) {
        try {
            const { userID } = req.body;
            const user = await user_service_1.default.getById(userID);
            const logout = await user_service_1.default.update({ ...user, token: null });
            return res.status(200).send(logout);
        }
        catch (error) {
            return res.status(400).send(error);
        }
    }
}
exports.AuthController = AuthController;
