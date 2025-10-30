"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenVerification = void 0;
const create_jwt_1 = require("./create-jwt");
const createTokenVerification = (payload) => {
    const payloadToken = {
        user_id: payload.user_id,
        type: payload.type,
        email: payload.email,
        role: payload.role,
        purpose: payload.purpose,
    };
    const token = (0, create_jwt_1.createJwt)({ payload: payloadToken });
    return token;
};
exports.createTokenVerification = createTokenVerification;
//# sourceMappingURL=create-token-verification.js.map