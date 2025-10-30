"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizedRoles = exports.authenticatedVerifyAccount = exports.authenticatedUser = exports.authenticatedResetPassword = void 0;
const errors_1 = require("../utils/errors");
const unauthenticated_1 = require("../utils/errors/unauthenticated");
const helpers_1 = __importDefault(require("../utils/helpers"));
const authenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }
        if (!token)
            throw new unauthenticated_1.UnauthenticatedError("Authenticated invalid");
        const payload = helpers_1.default.isTokenValid({ token });
        if (payload.type !== "ACCESS")
            throw new errors_1.ForbiddenError("Token is valid but not authorized for access");
        req.user = {
            user_id: payload.user_id,
            type: payload.type,
            name: payload.name,
            email: payload.email,
            role: payload.role,
            is_first_login: payload.is_first_login,
        };
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.authenticatedUser = authenticatedUser;
const authenticatedVerifyAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer"))
            token = authHeader.split(" ")[1];
        if (!token)
            throw new unauthenticated_1.UnauthenticatedError("Authentication token is missing or malformed.");
        const payload = helpers_1.default.isTokenValid({ token });
        if (payload.type !== "VERIFY_ACCOUNT")
            throw new errors_1.ForbiddenError("Token is valid but not authorized for verify account");
        req.user = {
            user_id: payload.user_id,
            jti: payload.jti,
            role: payload.role,
            type: payload.type,
            email: payload.email
        };
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.authenticatedVerifyAccount = authenticatedVerifyAccount;
const authenticatedResetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer"))
            token = authHeader.split(" ")[1];
        if (!token)
            throw new unauthenticated_1.UnauthenticatedError("Authentication token is missing or malformed.");
        const payload = helpers_1.default.isTokenValid({ token });
        if (payload.type !== "RESET_PASSWORD")
            throw new errors_1.ForbiddenError("Token is valid but not authorized for password reset.");
        req.user = {
            user_id: payload.user_id,
            type: payload.type,
            role: payload.role,
            email: payload.email,
        };
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.authenticatedResetPassword = authenticatedResetPassword;
const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        var _a;
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.role))
            throw new unauthenticated_1.UnauthenticatedError("unauthorized to access this route");
        if (!roles.includes(req.user.role)) {
            throw new unauthenticated_1.UnauthenticatedError("Unauthorized to access this route");
        }
        next();
    };
};
exports.authorizedRoles = authorizedRoles;
//# sourceMappingURL=auth.js.map