"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toStaffResponse = (staff) => {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
        id: staff.id,
        user_id: staff.user_id,
        profile_picture: (_a = staff.profile_picture) !== null && _a !== void 0 ? _a : "",
        identity_number: (_b = staff.identity_number) !== null && _b !== void 0 ? _b : "",
        gender: (_c = staff.gender) !== null && _c !== void 0 ? _c : "",
        date_of_birth: (_e = (_d = staff.date_of_birth) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : "",
        phone_number: (_f = staff.phone_number) !== null && _f !== void 0 ? _f : "",
        occupation: (_g = staff.occupation) !== null && _g !== void 0 ? _g : "",
        marital_status: staff.marital_status,
        created_at: staff.created_at,
        updated_at: staff.updated_at,
    };
};
const toStaffResponses = (staff) => {
    return staff.map((staf) => {
        var _a, _b, _c, _d, _e, _f, _g;
        return ({
            id: staf.id,
            user_id: staf.user_id,
            profile_picture: (_a = staf.profile_picture) !== null && _a !== void 0 ? _a : "",
            identity_number: (_b = staf.identity_number) !== null && _b !== void 0 ? _b : "",
            gender: (_c = staf.gender) !== null && _c !== void 0 ? _c : "",
            date_of_birth: (_e = (_d = staf.date_of_birth) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : "",
            phone_number: (_f = staf.phone_number) !== null && _f !== void 0 ? _f : "",
            occupation: (_g = staf.occupation) !== null && _g !== void 0 ? _g : "",
            marital_status: staf.marital_status,
            created_at: staf.created_at,
            updated_at: staf.updated_at,
        });
    });
};
exports.default = { toStaffResponse, toStaffResponses };
//# sourceMappingURL=staff-response.js.map