"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followRoutes = void 0;
const express_1 = require("express");
const follow_controller_1 = __importDefault(require("../controller/follow.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const followRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new follow_controller_1.default();
    router.post("/", auth_middleware_1.default, controller.create);
    router.get("/listAllWhoIFollow", auth_middleware_1.default, controller.listAllWhoIFollow);
    router.get("/listWhoFollowMe", auth_middleware_1.default, controller.listWhoFollowMe);
    router.delete('/delete/:followedId', auth_middleware_1.default, controller.deleteWhoIFollow);
    return router;
};
exports.followRoutes = followRoutes;
