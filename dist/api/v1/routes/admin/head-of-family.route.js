"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const head_of_family_controller_1 = require("../../controllers/head-of-family.controller");
const client_1 = require("@prisma/client");
const headOfFamilyRouteAdmin = (0, express_1.Router)();
headOfFamilyRouteAdmin.get("/", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)("ADMIN"), head_of_family_controller_1.HeadOfFamilyUserController.getHeadOfFamilies);
headOfFamilyRouteAdmin.get("/:id/detail", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN), head_of_family_controller_1.HeadOfFamilyUserController.getHeadOfFamilyById);
exports.default = headOfFamilyRouteAdmin;
//# sourceMappingURL=head-of-family.route.js.map