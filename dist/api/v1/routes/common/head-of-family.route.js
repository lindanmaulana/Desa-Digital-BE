"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const head_of_family_controller_1 = require("../../controllers/head-of-family.controller");
const client_1 = require("@prisma/client");
const headOfFamilyRouteCommon = (0, express_1.Router)();
headOfFamilyRouteCommon.get("/", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN, client_1.UserRole.STAFF), head_of_family_controller_1.HeadOfFamilyUserController.getHeadOfFamilies);
headOfFamilyRouteCommon.get("/:id/detail", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN, client_1.UserRole.STAFF), head_of_family_controller_1.HeadOfFamilyUserController.getHeadOfFamilyById);
exports.default = headOfFamilyRouteCommon;
//# sourceMappingURL=head-of-family.route.js.map