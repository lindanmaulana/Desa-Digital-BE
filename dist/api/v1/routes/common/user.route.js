"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = __importDefault(require("../../controllers"));
const client_1 = require("@prisma/client");
const userRouteCommon = (0, express_1.Router)();
userRouteCommon.get("/", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserController.getUsers);
userRouteCommon.get("/:id", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserController.getUserById);
userRouteCommon.get("/me", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserController.getProfile);
userRouteCommon.get("/me/password", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserController.changePassword);
userRouteCommon.delete("/:id", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN), controllers_1.default.UserController.deleteUser);
exports.default = userRouteCommon;
//# sourceMappingURL=user.route.js.map