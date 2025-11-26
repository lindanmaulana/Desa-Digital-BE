"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const head_of_family_route_1 = __importDefault(require("../management/head-of-family.route"));
const user_route_1 = __importDefault(require("./user.route"));
const village_profile_route_1 = __importDefault(require("./village-profile.route"));
const social_assistance_route_1 = __importDefault(require("../management/social-assistance.route"));
const commonRoute = (0, express_1.Router)();
commonRoute.use("/users", user_route_1.default);
commonRoute.use("/village/profiles", village_profile_route_1.default);
commonRoute.use("/head-of-families", head_of_family_route_1.default);
commonRoute.use("/social-assistances", social_assistance_route_1.default);
exports.default = commonRoute;
//# sourceMappingURL=index.js.map