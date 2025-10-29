"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = exports.createJwt = void 0;
const config_1 = require("../../../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../errors");
const logging_1 = require("../../../logging");
const unauthenticated_1 = require("../../errors/unauthenticated");
const createJwt = ({ payload }) => {
    if (!config_1.JWTSECRETKEY) {
        logging_1.logger.error("jwt secret key is not defined");
        throw new errors_1.BadrequestError("Server Error");
    }
    const token = jsonwebtoken_1.default.sign(payload, config_1.JWTSECRETKEY, {
        expiresIn: "24h",
    });
    return token;
};
exports.createJwt = createJwt;
const isTokenValid = ({ token }) => {
    if (!config_1.JWTSECRETKEY) {
        logging_1.logger.error("jwt secret key is not defined");
        throw new errors_1.BadrequestError("Server Error");
    }
    try {
        const isValid = jsonwebtoken_1.default.verify(token, config_1.JWTSECRETKEY);
        return isValid;
    }
    catch (err) {
        let errorMessage = "An unexpected error occurred";
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            errorMessage = `Token Error : ${err.message}`;
        }
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            errorMessage = `Token expired : ${err.message}`;
        }
        if (err instanceof jsonwebtoken_1.default.NotBeforeError) {
            errorMessage = `Token not active : ${err.message}`;
        }
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        throw new unauthenticated_1.UnauthenticatedError(errorMessage);
    }
};
exports.isTokenValid = isTokenValid;
//# sourceMappingURL=create-jwt.js.map