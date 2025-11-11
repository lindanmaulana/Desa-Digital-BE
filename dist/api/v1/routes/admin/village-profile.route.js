"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const client_1 = require("@prisma/client");
const controllers_1 = require("../../controllers");
const villageProfileRouteAdmin = (0, express_1.Router)();
villageProfileRouteAdmin.post("/", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.STAFF), rateLimit_1.adminRateLimit, controllers_1.VillageProfileController.create);
villageProfileRouteAdmin.patch("/:id", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN), rateLimit_1.adminRateLimit, controllers_1.VillageProfileController.update);
exports.default = villageProfileRouteAdmin;
//# sourceMappingURL=village-profile.route.js.map