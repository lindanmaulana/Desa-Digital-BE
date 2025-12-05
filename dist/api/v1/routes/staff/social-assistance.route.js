"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const auth_1 = require("../../../../middlewares/auth");
const rateLimit_1 = require("../../../../middlewares/rateLimit");
const setDynamicUploadPath_1 = require("../../../../middlewares/setDynamicUploadPath");
const images_1 = require("../../../../utils/const/images");
const controllers_1 = require("../../controllers");
const multer_1 = __importDefault(require("../../../../middlewares/multer"));
const socialAssistanceRouteStaff = (0, express_1.Router)();
socialAssistanceRouteStaff.post("/:id/image/upload", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.STAFF), (0, setDynamicUploadPath_1.setDynamicUploadPath)(images_1.SOCIALASSISTANCE_PATH), multer_1.default.single("social-assistances"), rateLimit_1.adminRateLimit, controllers_1.ImageController.uploadImageSocialAssistance);
socialAssistanceRouteStaff.put("/:id/image/update", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.STAFF), (0, setDynamicUploadPath_1.setDynamicUploadPath)(images_1.SOCIALASSISTANCE_PATH), multer_1.default.single("social-assistances"), rateLimit_1.adminRateLimit, controllers_1.ImageController.updateSocialAssistance);
socialAssistanceRouteStaff.delete("/:id/delete", auth_1.authenticatedUser, (0, auth_1.authorizedRoles)(client_1.UserRole.STAFF), rateLimit_1.adminRateLimit, controllers_1.SocialAssistanceController.delete);
exports.default = socialAssistanceRouteStaff;
//# sourceMappingURL=social-assistance.route.js.map