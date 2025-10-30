"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokenUser = void 0;
const create_jwt_1 = require("./create-jwt");
const createTokenUser = (user) => {
    const payloadToken = {
        user_id: user.id,
        role: user.role,
        type: "ACCESS",
        name: user.name,
        email: user.email,
        is_active: user.is_active,
        is_first_login: user.is_first_login,
    };
    const token = (0, create_jwt_1.createJwt)({ payload: payloadToken });
    return token;
};
exports.createTokenUser = createTokenUser;
//# sourceMappingURL=create-token-user.js.map