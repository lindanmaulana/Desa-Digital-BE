"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const client_1 = require("@prisma/client");
const setDynamicUploadPath_1 = require("../../../../middlewares/setDynamicUploadPath");
const images_1 = require("../../../../utils/const/images");
const multer_1 = __importDefault(require("../../../../middlewares/multer"));
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const controllers_1 = require("../../controllers");
const socialAssistanceRecipientRouteStaff = (0, express_1.Router)();
socialAssistanceRecipientRouteStaff.post("/:id/image/upload", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.STAFF), (0, setDynamicUploadPath_1.setDynamicUploadPath)(images_1.SOCIALASSISTANCERECIPIENT_PATH), multer_1.default.single("social-assistance-recipients"), rateLimit_1.adminRateLimit, controllers_1.ImageController.uploadImageSocialAssistanceRecipient);
// socialAssistanceRecipientRouteStaff.delete("/:id/delete", authenticatedUser, authorizedRoles(UserRole.STAFF), adminRateLimit, SocialAssistanceController.delete)
exports.default = socialAssistanceRecipientRouteStaff;
//# sourceMappingURL=social-assistance-recipient.route.js.map