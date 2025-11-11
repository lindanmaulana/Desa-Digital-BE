"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../../middlewares/auth");
const rateLimit_1 = require("../../../middlewares/rateLimit");
const controllers_1 = require("../controllers");
const route = (0, express_1.Router)();
route.post("/signin", rateLimit_1.publicRateLimit, controllers_1.AuthController.signin);
route.post("/verify-account/verify", rateLimit_1.publicRateLimit, controllers_1.AuthController.verifyAccount);
route.post("/verify-account/resend-token", rateLimit_1.publicRateLimit, controllers_1.AuthController.resendTokenVerifyAccount);
route.post("/verify-account/resend-otp", rateLimit_1.publicRateLimit, controllers_1.AuthController.resendOtpVerifyAccount);
route.post("/forgot-password/request", rateLimit_1.publicRateLimit, controllers_1.AuthController.forgotPassword);
route.post("/forgot-password/resend-otp", rateLimit_1.publicRateLimit, controllers_1.AuthController.resendOtpForgotPassword);
route.post("/forgot-password/verify-otp", rateLimit_1.publicRateLimit, controllers_1.AuthController.verifyOtpForgotPassword);
route.post("/forgot-password/reset", auth_1.authenticatedResetPassword, rateLimit_1.publicRateLimit, controllers_1.AuthController.resetPassword);
route.get("/profile/detail", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.UserController.getProfile);
route.get("/profile/password", auth_1.authenticatedUser, rateLimit_1.publicRateLimit, controllers_1.UserController.changePassword);
exports.default = route;
//# sourceMappingURL=auth.routes.js.map