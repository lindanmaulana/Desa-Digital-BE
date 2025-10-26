"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toStaffResponse = (staff) => {
    var _a, _b, _c, _d, _e, _f;
    return {
        id: staff.id,
        user_id: staff.user_id,
        identity_number: (_a = staff.identity_number) !== null && _a !== void 0 ? _a : "",
        gender: (_b = staff.gender) !== null && _b !== void 0 ? _b : "",
        date_of_birth: (_d = (_c = staff.date_of_birth) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "",
        phone_number: (_e = staff.phone_number) !== null && _e !== void 0 ? _e : "",
        occupation: (_f = staff.occupation) !== null && _f !== void 0 ? _f : "",
        marital_status: staff.marital_status,
        created_at: staff.created_at,
        updated_at: staff.updated_at,
    };
};
const toStaffResponses = (staff) => {
    return staff.map((staf) => {
        var _a, _b, _c, _d, _e, _f;
        return ({
            id: staf.id,
            user_id: staf.user_id,
            identity_number: (_a = staf.identity_number) !== null && _a !== void 0 ? _a : "",
            gender: (_b = staf.gender) !== null && _b !== void 0 ? _b : "",
            date_of_birth: (_d = (_c = staf.date_of_birth) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "",
            phone_number: (_e = staf.phone_number) !== null && _e !== void 0 ? _e : "",
            occupation: (_f = staf.occupation) !== null && _f !== void 0 ? _f : "",
            marital_status: staf.marital_status,
            created_at: staf.created_at,
            updated_at: staf.updated_at,
        });
    });
};
exports.default = { toStaffResponse, toStaffResponses };
//# sourceMappingURL=staff-response.js.map