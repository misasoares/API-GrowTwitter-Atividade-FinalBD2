"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweetRoutes = void 0;
const express_1 = require("express");
const tweet_controller_1 = __importDefault(require("../controller/tweet.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const tweetRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new tweet_controller_1.default();
    router.post('/', auth_middleware_1.default, controller.create);
    router.get('/list-by-user', auth_middleware_1.default, controller.listByIdUser);
    router.get('/', auth_middleware_1.default, controller.list);
    router.get('/unique-tweet/:idTweet', auth_middleware_1.default, controller.showUniqueTweet);
    router.put('/', auth_middleware_1.default, controller.update);
    router.delete('/', auth_middleware_1.default, controller.delete);
    router.delete('/all', controller.deleteAll);
    return router;
};
exports.tweetRoutes = tweetRoutes;
