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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizedRoles = exports.authenticatedUser = void 0;
const create_jwt_1 = require("../utils/helpers/create-jwt");
const unauthenticated_1 = require("../utils/errors/unauthenticated");
const authenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
        }
        if (!token)
            throw new unauthenticated_1.UnauthenticatedError("Authenticated invalid");
        const payload = (0, create_jwt_1.isTokenValid)({ token });
        req.user = {
            id: payload.id,
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