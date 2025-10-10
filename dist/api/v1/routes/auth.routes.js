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
route.patch("/me/password", rateLimit_1.publicRateLimit, auth_1.authenticatedUser, controllers_1.default.AuthController.changePassword);
exports.default = route;
//# sourceMappingURL=auth.routes.js.map