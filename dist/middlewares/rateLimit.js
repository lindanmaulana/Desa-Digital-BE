"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRateLimit = exports.publicRateLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.publicRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    limit: 100,
    message: "Too manny request, please try again later.",
    standardHeaders: true,
    legacyHeaders: false
});
exports.adminRateLimit = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    limit: 20,
    message: "Too many admin actions, please slow down.",
    standardHeaders: true,
    legacyHeaders: false
});
//# sourceMappingURL=rateLimit.js.map