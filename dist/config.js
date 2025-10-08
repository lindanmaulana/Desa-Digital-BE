"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTEXPIRATION = exports.JWTSECRETKEYREFRESH = exports.JWTSECRETKEY = void 0;
const JWTSECRETKEY = process.env.JWT_SECRET;
exports.JWTSECRETKEY = JWTSECRETKEY;
const JWTSECRETKEYREFRESH = process.env.JWT_SECRET_REFRESH;
exports.JWTSECRETKEYREFRESH = JWTSECRETKEYREFRESH;
const JWTEXPIRATION = process.env.JWT_EXPIRATION;
exports.JWTEXPIRATION = JWTEXPIRATION;
//# sourceMappingURL=config.js.map