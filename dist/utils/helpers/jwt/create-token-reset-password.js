"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenResetPassword = void 0;
const create_jwt_1 = require("./create-jwt");
const createTokenResetPassword = (payload) => {
    const payloadToken = {
        user_id: payload.user_id,
        type: payload.type,
        email: payload.email,
        role: payload.role,
    };
    const token = (0, create_jwt_1.createJwt)({ payload: payloadToken });
    return token;
};
exports.createTokenResetPassword = createTokenResetPassword;
//# sourceMappingURL=create-token-reset-password.js.map