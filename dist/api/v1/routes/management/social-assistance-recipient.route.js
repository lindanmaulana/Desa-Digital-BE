"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const client_1 = require("@prisma/client");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const social_assistance_recipient_controller_1 = require("../../controllers/social-assistance-recipient.controller");
const socialAssistanceRecipientManagementRoute = (0, express_1.Router)();
socialAssistanceRecipientManagementRoute.get("/", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.ADMIN, client_1.UserRole.STAFF), rateLimit_1.adminRateLimit, social_assistance_recipient_controller_1.SocialAssistanceRecipientController.getSocialAssistanceRecipients);
exports.default = socialAssistanceRecipientManagementRoute;
//# sourceMappingURL=social-assistance-recipient.route.js.map