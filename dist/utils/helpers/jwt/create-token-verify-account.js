"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenVerifyAccount = void 0;
const create_jwt_1 = require("./create-jwt");
const createTokenVerifyAccount = (payload) => {
    const payloadToken = {
        user_id: payload.user_id,
        type: payload.type,
        jti: payload.jti,
        role: payload.role,
        email: payload.email
    };
    const token = (0, create_jwt_1.createJwt)({ payload: payloadToken });
    return token;
};
exports.createTokenVerifyAccount = createTokenVerifyAccount;
//# sourceMappingURL=create-token-verify-account.js.map