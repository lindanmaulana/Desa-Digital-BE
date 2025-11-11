"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = require("../../controllers");
const userRouteAdmin = (0, express_1.Router)();
userRouteAdmin.post("/staff/register", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN), rateLimit_1.adminRateLimit, controllers_1.UserController.registerStaff);
userRouteAdmin.post("/head-of-family/register", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN, client_1.UserRole.STAFF), rateLimit_1.adminRateLimit, controllers_1.UserController.registerHeadOfFamily);
userRouteAdmin.delete("/:id", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN), rateLimit_1.adminRateLimit, controllers_1.UserController.deleteUser);
exports.default = userRouteAdmin;
//# sourceMappingURL=user.route.js.map