"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../middlewares/auth");
const rateLimit_1 = require("../../../middlewares/rateLimit");
const controllers_1 = __importDefault(require("../controllers"));
const route = (0, express_1.Router)();
route.post("/signup", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.signup);
route.post("/signin", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.signin);
route.post("/verify-account", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.activation);
route.post("/resend-otp", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.resendOtp);
route.post("/forgot-password", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.forgotPassword);
route.post("/verify-otp", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.matchOtp);
route.post("/reset-password", auth_1.authenticatedVerificationUser, rateLimit_1.publicRateLimit, controllers_1.default.AuthController.resetPassword);
route.get("/profile", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserProfileController.getProfile);
route.get("/profile/password", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserProfileController.changePassword);
exports.default = route;
//# sourceMappingURL=auth.routes.js.map