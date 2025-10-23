"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = __importDefault(require("../../controllers"));
const VillageProfileRouteCommon = (0, express_1.Router)();
VillageProfileRouteCommon.get("/", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.VillageProfileController.get);
exports.default = VillageProfileRouteCommon;
//# sourceMappingURL=village-profile.route.js.map