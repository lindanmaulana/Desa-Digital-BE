"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = require("../../controllers");
const VillageProfileRouteCommon = (0, express_1.Router)();
VillageProfileRouteCommon.get("/", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.VillageProfileController.get);
exports.default = VillageProfileRouteCommon;
//# sourceMappingURL=village-profile.route.js.map