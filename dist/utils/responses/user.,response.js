"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const to_user_role_1 = require("../helpers/to-user-role");
const toUserResponse = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: (0, to_user_role_1.toUserRole)(user.role),
        is_active: user.is_active,
        is_first_login: user.is_first_login,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
};
const toUserResponseWithRelation = (user) => {
    var _a, _b, _c, _d, _e, _f;
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: (0, to_user_role_1.toUserRole)(user.role),
        is_active: user.is_active,
        is_first_login: user.is_first_login,
        staff: user.staff && {
            id: user.staff.id,
            user_id: user.staff.user_id,
            profile_picture: (_a = user.staff.profile_picture) !== null && _a !== void 0 ? _a : "",
            identity_number: (_b = user.staff.identity_number) !== null && _b !== void 0 ? _b : "",
            gender: user.staff.gender,
            date_of_birth: (_d = (_c = user.staff.date_of_birth) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "",
            phone_number: (_e = user.staff.phone_number) !== null && _e !== void 0 ? _e : "",
            occupation: (_f = user.staff.occupation) !== null && _f !== void 0 ? _f : "",
            marital_status: user.staff.marital_status,
            created_at: user.staff.created_at,
            updated_at: user.staff.updated_at,
        },
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
};
const toUserResponses = (users) => {
    return users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: (0, to_user_role_1.toUserRole)(user.role),
        is_active: user.is_active,
        is_first_login: user.is_first_login,
        created_at: user.created_at,
        updated_at: user.updated_at,
    }));
};
const toUserResponsesWithRelation = (users) => {
    return users.map((user) => {
        var _a, _b, _c, _d, _e, _f;
        return ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: (0, to_user_role_1.toUserRole)(user.role),
            is_active: user.is_active,
            is_first_login: user.is_first_login,
            staff: user.staff && {
                id: user.staff.id,
                user_id: user.staff.user_id,
                profile_picture: (_a = user.staff.profile_picture) !== null && _a !== void 0 ? _a : "",
                identity_number: (_b = user.staff.identity_number) !== null && _b !== void 0 ? _b : "",
                gender: user.staff.gender,
                date_of_birth: (_d = (_c = user.staff.date_of_birth) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "",
                phone_number: (_e = user.staff.phone_number) !== null && _e !== void 0 ? _e : "",
                occupation: (_f = user.staff.occupation) !== null && _f !== void 0 ? _f : "",
                marital_status: user.staff.marital_status,
                created_at: user.staff.created_at,
                updated_at: user.staff.updated_at,
            },
            created_at: user.created_at,
            updated_at: user.updated_at,
        });
    });
};
exports.default = { toUserResponse, toUserResponses, toUserResponseWithRelation, toUserResponsesWithRelation };
//# sourceMappingURL=user.,response.js.map