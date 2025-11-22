"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = require("../../controllers");
const villageProfileRouteCommon = (0, express_1.Router)();
villageProfileRouteCommon.get("/", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.VillageProfileController.get);
exports.default = villageProfileRouteCommon;
//# sourceMappingURL=village-profile.route.js.map