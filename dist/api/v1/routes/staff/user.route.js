"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const client_1 = require("@prisma/client");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = require("../../controllers");
const userRouteStaff = (0, express_1.Router)();
userRouteStaff.post("/head-of-family/register", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.STAFF), rateLimit_1.adminRateLimit, controllers_1.UserController.registerHeadOfFamily);
exports.default = userRouteStaff;
//# sourceMappingURL=user.route.js.map