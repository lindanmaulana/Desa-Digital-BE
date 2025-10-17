"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = __importDefault(require("../../controllers"));
const socialAssistanceRouteCommon = (0, express_1.Router)();
socialAssistanceRouteCommon.get("/", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.SocialAssistanceController.getSocialAssistances);
exports.default = socialAssistanceRouteCommon;
//# sourceMappingURL=social-assistance.route.js.map