"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const social_assistance_route_1 = __importDefault(require("./social-assistance.route"));
const village_profile_route_1 = __importDefault(require("./village-profile.route"));
const user_route_1 = __importDefault(require("./user.route"));
const social_assistance_recipient_route_1 = __importDefault(require("./social-assistance-recipient.route"));
const staffRoute = (0, express_1.Router)();
staffRoute.use("/users", user_route_1.default);
staffRoute.use("/village-profiles", village_profile_route_1.default);
staffRoute.use("/social-assistances", social_assistance_route_1.default);
staffRoute.use("/social-assistance-recipients", social_assistance_recipient_route_1.default);
exports.default = staffRoute;
//# sourceMappingURL=index.js.map