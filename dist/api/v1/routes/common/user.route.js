"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = require("../../controllers");
const userRouteCommon = (0, express_1.Router)();
userRouteCommon.get("/", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.UserController.getUsers);
userRouteCommon.get("/:id", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.UserController.getUserById);
exports.default = userRouteCommon;
//# sourceMappingURL=user.route.js.map