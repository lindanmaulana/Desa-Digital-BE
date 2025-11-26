"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = require("../../controllers");
const socialAssistanceManagementRoute = (0, express_1.Router)();
socialAssistanceManagementRoute.get("/", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.SocialAssistanceController.getSocialAssistances);
socialAssistanceManagementRoute.get("/:id", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.SocialAssistanceController.getSocialAssistanceById);
exports.default = socialAssistanceManagementRoute;
//# sourceMappingURL=social-assistance.route.js.map