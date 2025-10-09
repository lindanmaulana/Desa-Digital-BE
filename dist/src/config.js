"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_PASSWORD = exports.MAIL_NAME = exports.JWTEXPIRATION = exports.JWTSECRETKEYREFRESH = exports.JWTSECRETKEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWTSECRETKEY = process.env.JWT_SECRET;
exports.JWTSECRETKEY = JWTSECRETKEY;
const JWTSECRETKEYREFRESH = process.env.JWT_SECRET_REFRESH;
exports.JWTSECRETKEYREFRESH = JWTSECRETKEYREFRESH;
const JWTEXPIRATION = process.env.JWT_EXPIRATION;
exports.JWTEXPIRATION = JWTEXPIRATION;
const MAIL_NAME = process.env.MAIL_NAME;
exports.MAIL_NAME = MAIL_NAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
exports.MAIL_PASSWORD = MAIL_PASSWORD;
//# sourceMappingURL=config.js.map