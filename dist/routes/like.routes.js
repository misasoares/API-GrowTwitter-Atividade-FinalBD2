"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeRoutes = void 0;
const express_1 = require("express");
const like_controller_1 = __importDefault(require("../controller/like.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const likeRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new like_controller_1.default();
    router.post("/", auth_middleware_1.default, controller.create);
    router.get("/list", auth_middleware_1.default, controller.list);
    router.get("/listAllLikesByUser", auth_middleware_1.default, controller.listAllLikesByUser);
    router.delete("/:id", auth_middleware_1.default, controller.delete);
    return router;
};
exports.likeRoutes = likeRoutes;
