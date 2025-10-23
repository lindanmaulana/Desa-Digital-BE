"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const social_assistance_route_1 = __importDefault(require("./social-assistance.route"));
const user_route_1 = __importDefault(require("./user.route"));
const village_profile_route_1 = __importDefault(require("./village-profile.route"));
const commonRoute = (0, express_1.Router)();
commonRoute.use("/users", user_route_1.default);
commonRoute.use("/social-assistance", social_assistance_route_1.default);
commonRoute.use("/village/profile", village_profile_route_1.default);
exports.default = commonRoute;
//# sourceMappingURL=index.js.map