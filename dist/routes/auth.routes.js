"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const authRoutes = () => {
    const router = (0, express_1.Router)();
    const controller = new auth_controller_1.AuthController();
    router.post("/login", controller.login);
    router.get("/logout", auth_middleware_1.default, controller.logout);
    return router;
};
exports.authRoutes = authRoutes;
