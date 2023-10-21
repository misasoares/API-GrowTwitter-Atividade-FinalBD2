"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const userRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new user_controller_1.default();
    router.post("/", controller.create);
    router.get("/", auth_middleware_1.default, controller.list);
    router.get("/me", auth_middleware_1.default, controller.getById);
    router.get("/:id", controller.getAllById);
    router.put("/", auth_middleware_1.default, controller.update);
    router.delete("/delete", auth_middleware_1.default, controller.delete);
    return router;
};
exports.userRoutes = userRoutes;
