"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const head_of_family_route_1 = __importDefault(require("./head-of-family.route"));
const social_assistance_recipient_route_1 = __importDefault(require("./social-assistance-recipient.route"));
const social_assistance_route_1 = __importDefault(require("./social-assistance.route"));
const managementRoute = (0, express_1.Router)();
managementRoute.use("/head-of-families", head_of_family_route_1.default);
managementRoute.use("/social-assistances", social_assistance_route_1.default);
managementRoute.use("/social-assistance-recipients", social_assistance_recipient_route_1.default);
exports.default = managementRoute;
//# sourceMappingURL=index.js.map