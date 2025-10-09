"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rateLimit_1 = require("../../../middlewares/rateLimit");
const user_controller_1 = require("../controllers/user.controller");
const apicache_1 = __importDefault(require("apicache"));
const route = (0, express_1.Router)();
route.post("/auth/signup", rateLimit_1.publicRateLimit, user_controller_1.UserController.signup);
route.post("/auth/signin", rateLimit_1.publicRateLimit, user_controller_1.UserController.signin);
route.get("/users", apicache_1.default.middleware("5 minutes"), rateLimit_1.publicRateLimit, user_controller_1.UserController.getUsers);
route.get("/users/:id", apicache_1.default.middleware("5 minutes"), rateLimit_1.publicRateLimit, user_controller_1.UserController.getUserById);
route.delete("/users/:id", user_controller_1.UserController.deleteUser);
exports.default = route;
//# sourceMappingURL=user.routes.js.map