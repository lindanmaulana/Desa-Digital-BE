"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const social_assistance_recipient_route_1 = __importDefault(require("./social-assistance-recipient.route"));
const headOfFamilyRoute = (0, express_1.Router)();
headOfFamilyRoute.use("/social-assistance-recipients", social_assistance_recipient_route_1.default);
exports.default = headOfFamilyRoute;
//# sourceMappingURL=index.js.map