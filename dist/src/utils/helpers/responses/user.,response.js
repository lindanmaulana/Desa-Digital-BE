"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponses = exports.toUserResponse = void 0;
const user_role_1 = require("../user-role");
const toUserResponse = (user) => {
    var _a;
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: (0, user_role_1.toUserRole)(user.role),
        otp_code: (_a = user.otp_code) !== null && _a !== void 0 ? _a : "",
        is_first_login: user.is_first_login,
        is_active: user.is_active,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
};
exports.toUserResponse = toUserResponse;
const toUserResponses = (users) => {
    return users.map((user) => {
        var _a;
        return ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: (0, user_role_1.toUserRole)(user.role),
            otp_code: (_a = user.otp_code) !== null && _a !== void 0 ? _a : "",
            is_first_login: user.is_first_login,
            is_active: user.is_active,
            created_at: user.created_at,
            updated_at: user.updated_at,
        });
    });
};
exports.toUserResponses = toUserResponses;
//# sourceMappingURL=user.,response.js.map