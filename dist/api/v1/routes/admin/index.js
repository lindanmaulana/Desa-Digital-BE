"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./user.route"));
const village_profile_route_1 = __importDefault(require("./village-profile.route"));
const adminRoute = (0, express_1.Router)();
adminRoute.use("/users", user_route_1.default);
adminRoute.use("/village/profile", village_profile_route_1.default);
exports.default = adminRoute;
//# sourceMappingURL=index.js.map