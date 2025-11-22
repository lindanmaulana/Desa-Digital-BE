"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
const to_user_role_1 = require("../helpers/to-user-role");
exports.toUserResponse = {
    response: (user) => {
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
    },
    responses: (users) => {
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
    },
    withRelationResponse: (user) => {
        var _a, _b, _c, _d;
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
                identity_number: (_a = user.staff.identity_number) !== null && _a !== void 0 ? _a : "",
                gender: user.staff.gender,
                date_of_birth: user.staff.date_of_birth,
                phone_number: (_b = user.staff.phone_number) !== null && _b !== void 0 ? _b : "",
                occupation: (_c = user.staff.occupation) !== null && _c !== void 0 ? _c : "",
                marital_status: user.staff.marital_status,
                created_at: user.staff.created_at,
                updated_at: user.staff.updated_at,
            },
            image: user.image && {
                id: user.image.id,
                filename: user.image.filename,
                path: user.image.path,
                user_id: (_d = user.image.user_id) !== null && _d !== void 0 ? _d : "",
                entity_type: user.image.entity_type,
                created_at: user.image.created_at,
                updated_at: user.image.updated_at,
            },
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    },
    withRelationResponses: (users) => {
        return users.map((user) => {
            var _a, _b, _c, _d, _e, _f, _g;
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
                    identity_number: (_a = user.staff.identity_number) !== null && _a !== void 0 ? _a : "",
                    gender: user.staff.gender,
                    date_of_birth: user.staff.date_of_birth,
                    phone_number: (_b = user.staff.phone_number) !== null && _b !== void 0 ? _b : "",
                    occupation: (_c = user.staff.occupation) !== null && _c !== void 0 ? _c : "",
                    marital_status: user.staff.marital_status,
                    created_at: user.staff.created_at,
                    updated_at: user.staff.updated_at,
                },
                head_of_family: user.head_of_family && {
                    id: user.head_of_family.id,
                    user_id: user.head_of_family.user_id,
                    identity_number: (_d = user.head_of_family.identity_number) !== null && _d !== void 0 ? _d : "",
                    gender: user.head_of_family.gender,
                    date_of_birth: user.head_of_family.date_of_birth,
                    phone_number: (_e = user.head_of_family.phone_number) !== null && _e !== void 0 ? _e : "",
                    occupation: (_f = user.head_of_family.occupation) !== null && _f !== void 0 ? _f : "",
                    marital_status: user.head_of_family.marital_status,
                    created_at: user.head_of_family.created_at,
                    updated_at: user.head_of_family.updated_at,
                },
                image: user.image && {
                    id: user.image.id,
                    filename: user.image.filename,
                    path: user.image.path,
                    user_id: (_g = user.image.user_id) !== null && _g !== void 0 ? _g : "",
                    entity_type: user.image.entity_type,
                    created_at: user.image.created_at,
                    updated_at: user.image.updated_at,
                },
                created_at: user.created_at,
                updated_at: user.updated_at,
            });
        });
    },
};
//# sourceMappingURL=user.response.js.map