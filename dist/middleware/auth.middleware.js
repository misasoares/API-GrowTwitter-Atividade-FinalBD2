"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../service/user.service"));
async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send({
                code: 401,
                message: 'Authentication token fail',
            });
        }
        const result = await user_service_1.default.getUserByToken(token);
        if (!result.data) {
            return res.status(401).send({
                code: 401,
                message: 'Authentication token fail',
            });
        }
        req.body.userID = result.data.id;
        next();
    }
    catch (error) {
        return res.status(500).send({
            code: 500,
            message: error,
        });
    }
}
exports.default = authMiddleware;
