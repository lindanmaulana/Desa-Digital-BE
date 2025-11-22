"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStaffResponse = void 0;
exports.toStaffResponse = {
    response: (headOfFamily) => {
        return {
            id: headOfFamily.id,
            user_id: headOfFamily.user_id,
            identity_number: headOfFamily.identity_number,
            gender: headOfFamily.gender,
            date_of_birth: headOfFamily.date_of_birth,
            phone_number: headOfFamily.phone_number,
            occupation: headOfFamily.occupation,
            marital_status: headOfFamily.marital_status,
            created_at: headOfFamily.created_at,
            updated_at: headOfFamily.updated_at,
        };
    },
    responses: (headOfFamilies) => {
        return headOfFamilies.map((headOfFamily) => ({
            id: headOfFamily.id,
            user_id: headOfFamily.user_id,
            identity_number: headOfFamily.identity_number,
            gender: headOfFamily.gender,
            date_of_birth: headOfFamily.date_of_birth,
            phone_number: headOfFamily.phone_number,
            occupation: headOfFamily.occupation,
            marital_status: headOfFamily.marital_status,
            created_at: headOfFamily.created_at,
            updated_at: headOfFamily.updated_at,
        }));
    },
    withRelationResponse: (headOfFamily) => {
        return {
            id: headOfFamily.id,
            user_id: headOfFamily.user_id,
            identity_number: headOfFamily.identity_number,
            gender: headOfFamily.gender,
            date_of_birth: headOfFamily.date_of_birth && headOfFamily.date_of_birth,
            phone_number: headOfFamily.phone_number,
            occupation: headOfFamily.occupation,
            marital_status: headOfFamily.marital_status,
            user: headOfFamily.user,
            created_at: headOfFamily.created_at,
            updated_at: headOfFamily.updated_at,
        };
    },
    withRelationesponses: (headOfFamilies) => {
        return headOfFamilies.map((headOfFamily) => ({
            id: headOfFamily.id,
            user_id: headOfFamily.user_id,
            identity_number: headOfFamily.identity_number,
            gender: headOfFamily.gender,
            date_of_birth: headOfFamily.date_of_birth && headOfFamily.date_of_birth,
            phone_number: headOfFamily.phone_number,
            occupation: headOfFamily.occupation,
            marital_status: headOfFamily.marital_status,
            user: headOfFamily.user,
            created_at: headOfFamily.created_at,
            updated_at: headOfFamily.updated_at,
        }));
    },
};
//# sourceMappingURL=staff-response.js.map