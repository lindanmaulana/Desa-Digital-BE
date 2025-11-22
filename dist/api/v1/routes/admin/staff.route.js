"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const client_1 = require("@prisma/client");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const staff_controller_1 = require("../../controllers/staff.controller");
const staffRouteAdmin = (0, express_1.Router)();
staffRouteAdmin.get("/", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN), rateLimit_1.adminRateLimit, staff_controller_1.StaffController.getStaff);
exports.default = staffRouteAdmin;
//# sourceMappingURL=staff.route.js.map