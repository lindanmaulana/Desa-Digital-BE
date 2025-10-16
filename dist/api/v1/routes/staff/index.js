"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const social_assistance_route_1 = __importDefault(require("./social-assistance.route"));
const staffRoute = (0, express_1.Router)();
staffRoute.use("/social-assistance", social_assistance_route_1.default);
exports.default = staffRoute;
//# sourceMappingURL=index.js.map