"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const client_1 = require("@prisma/client");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const social_assistance_recipient_controller_1 = require("../../controllers/social-assistance-recipient.controller");
const socialAssistanceRecipientHeadOfFamilyRoute = (0, express_1.Router)();
socialAssistanceRecipientHeadOfFamilyRoute.post("/", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.HEAD_OF_FAMILY), rateLimit_1.publicRateLimit, social_assistance_recipient_controller_1.SocialAssistanceRecipientController.create);
exports.default = socialAssistanceRecipientHeadOfFamilyRoute;
//# sourceMappingURL=social-assistance-recipient.route.js.map