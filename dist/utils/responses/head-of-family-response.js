"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHeadOfFamilyResponse = void 0;
exports.toHeadOfFamilyResponse = {
    response: (headOfFamily) => {
        var _a, _b, _c;
        return {
            id: headOfFamily.id,
            user_id: headOfFamily.user_id,
            identity_number: (_a = headOfFamily.identity_number) !== null && _a !== void 0 ? _a : "",
            gender: headOfFamily.gender,
            date_of_birth: headOfFamily.date_of_birth ? headOfFamily.date_of_birth.toString() : "",
            phone_number: (_b = headOfFamily.phone_number) !== null && _b !== void 0 ? _b : "",
            occupation: (_c = headOfFamily.occupation) !== null && _c !== void 0 ? _c : "",
            marital_status: headOfFamily.marital_status,
            user: headOfFamily.user,
            social_assistance_recipient: headOfFamily.sosial_assistance_recipient,
            created_at: headOfFamily.created_at,
            updated_at: headOfFamily.updated_at,
        };
    },
    responses: (headOfFamilies) => {
        return headOfFamilies.map((headOfFamily) => {
            var _a, _b, _c;
            return ({
                id: headOfFamily.id,
                user_id: headOfFamily.user_id,
                identity_number: (_a = headOfFamily.identity_number) !== null && _a !== void 0 ? _a : "",
                gender: headOfFamily.gender,
                date_of_birth: headOfFamily.date_of_birth ? headOfFamily.date_of_birth.toString() : "",
                phone_number: (_b = headOfFamily.phone_number) !== null && _b !== void 0 ? _b : "",
                occupation: (_c = headOfFamily.occupation) !== null && _c !== void 0 ? _c : "",
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