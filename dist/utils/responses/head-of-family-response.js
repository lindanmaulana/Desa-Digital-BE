"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHeadOfFamilyResponse = void 0;
exports.toHeadOfFamilyResponse = {
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
        var _a, _b;
        return {
            id: headOfFamily.id,
            user_id: headOfFamily.user_id,
            identity_number: headOfFamily.identity_number,
            gender: headOfFamily.gender,
            date_of_birth: headOfFamily.date_of_birth && headOfFamily.date_of_birth,
            phone_number: (_a = headOfFamily.phone_number) !== null && _a !== void 0 ? _a : "",
            occupation: (_b = headOfFamily.occupation) !== null && _b !== void 0 ? _b : "",
            marital_status: headOfFamily.marital_status,
            user: headOfFamily.user,
            social_assistance_recipient: headOfFamily.sosial_assistance_recipient,
            created_at: headOfFamily.created_at,
            updated_at: headOfFamily.updated_at,
        };
    },
    withRelationesponses: (headOfFamilies) => {
        return headOfFamilies.map((headOfFamily) => {
            var _a, _b;
            return ({
                id: headOfFamily.id,
                user_id: headOfFamily.user_id,
                identity_number: headOfFamily.identity_number,
                gender: headOfFamily.gender,
                date_of_birth: headOfFamily.date_of_birth && headOfFamily.date_of_birth,
                phone_number: (_a = headOfFamily.phone_number) !== null && _a !== void 0 ? _a : "",
                occupation: (_b = headOfFamily.occupation) !== null && _b !== void 0 ? _b : "",
                marital_status: headOfFamily.marital_status,
                user: headOfFamily.user,
                social_assistance_recipient: headOfFamily.sosial_assistance_recipient,
                created_at: headOfFamily.created_at,
                updated_at: headOfFamily.updated_at,
            });
        });
    },
};
//# sourceMappingURL=head-of-family-response.js.map