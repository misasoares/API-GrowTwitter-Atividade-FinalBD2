"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retweetRoutes = void 0;
const express_1 = require("express");
const retweet_controller_1 = __importDefault(require("../controller/retweet.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const retweetRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new retweet_controller_1.default();
    router.post('/', auth_middleware_1.default, controller.create);
    router.get('/', auth_middleware_1.default, controller.list);
    router.put('/', auth_middleware_1.default, controller.update);
    router.delete('/', auth_middleware_1.default, controller.delete);
    router.get('/listar-by-user', auth_middleware_1.default, controller.listByUserId);
    return router;
};
exports.retweetRoutes = retweetRoutes;
