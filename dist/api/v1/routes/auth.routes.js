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
route.post("/signin", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.signin);
route.post("/verify-account/verify", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.verifyAccount);
route.post("/verify-account/resend-token", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.resendTokenVerifyAccount);
route.post("/verify-account/resend-otp", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.resendOtpVerifyAccount);
route.post("/forgot-password/request", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.forgotPassword);
route.post("/forgot-password/resend-otp", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.resendOtpForgotPassword);
route.post("/forgot-password/verify-otp", rateLimit_1.publicRateLimit, controllers_1.default.AuthController.verifyOtpForgotPassword);
route.post("/forgot-password/reset", auth_1.authenticatedResetPassword, rateLimit_1.publicRateLimit, controllers_1.default.AuthController.resetPassword);
route.get("/profile", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserProfileController.getProfile);
route.get("/profile/password", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.default.UserProfileController.changePassword);
exports.default = route;
//# sourceMappingURL=auth.routes.js.map