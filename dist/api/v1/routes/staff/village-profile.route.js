"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const client_1 = require("@prisma/client");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = __importDefault(require("../../controllers"));
const VillageProfileRouteStaff = (0, express_1.Router)();
VillageProfileRouteStaff.post("/", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.STAFF), rateLimit_1.adminRateLimit, controllers_1.default.VillageProfileController.create);
VillageProfileRouteStaff.get("/", auth_1.authenticatedUser, rateLimit_1.adminRateLimit, controllers_1.default.VillageProfileController.get);
exports.default = VillageProfileRouteStaff;
//# sourceMappingURL=village-profile.route.js.map