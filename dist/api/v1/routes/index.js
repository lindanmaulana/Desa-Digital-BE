"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const mainRoute = (0, express_1.Router)();
mainRoute.use("/users", user_routes_1.default);
mainRoute.use("/auth", auth_routes_1.default);
exports.default = mainRoute;
//# sourceMappingURL=index.js.map