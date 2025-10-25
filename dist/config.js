"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASEURL_CLIENT = exports.MAIL_PASSWORD = exports.MAIL_USERNAME = exports.JWTEXPIRATION = exports.JWTSECRETKEYREFRESH = exports.JWTSECRETKEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWTSECRETKEY = process.env.JWT_SECRET;
exports.JWTSECRETKEY = JWTSECRETKEY;
const JWTSECRETKEYREFRESH = process.env.JWT_SECRET_REFRESH;
exports.JWTSECRETKEYREFRESH = JWTSECRETKEYREFRESH;
const JWTEXPIRATION = process.env.JWT_EXPIRATION;
exports.JWTEXPIRATION = JWTEXPIRATION;
const MAIL_USERNAME = process.env.MAIL_USERNAME;
exports.MAIL_USERNAME = MAIL_USERNAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
exports.MAIL_PASSWORD = MAIL_PASSWORD;
const BASEURL_CLIENT = process.env.BASEURL_CLIENT;
exports.BASEURL_CLIENT = BASEURL_CLIENT;
//# sourceMappingURL=config.js.map