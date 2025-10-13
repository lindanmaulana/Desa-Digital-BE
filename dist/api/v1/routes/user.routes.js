"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rateLimit_1 = require("../../../middlewares/rateLimit");
const controllers_1 = __importDefault(require("../controllers"));
const auth_1 = require("../../../middlewares/auth");
const client_1 = require("@prisma/client");
const route = (0, express_1.Router)();
route.get("/", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserController.getUsers);
route.get("/:id", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserController.getUserById);
route.get("/me", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserController.getProfile);
route.get("/me/password", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserController.changePassword);
route.delete("/:id", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN), controllers_1.default.UserController.deleteUser);
exports.default = route;
//# sourceMappingURL=user.routes.js.map