"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.VALID_CATEGORY_SOCIAL_ASSISTANCE = exports.VALID_ROLE = exports.VALID_MARITAL = exports.VALID_GENDER = void 0;
const client_1 = require("@prisma/client");
exports.VALID_GENDER = Object.values(client_1.Gender);
exports.VALID_MARITAL = Object.values(client_1.Marital);
exports.VALID_ROLE = Object.values(client_1.UserRole);
exports.VALID_CATEGORY_SOCIAL_ASSISTANCE = Object.values(client_1.CategorySocialAssistance);
class validation {
    static validate(schema, data) {
        return schema.parse(data);
    }
}
exports.validation = validation;
//# sourceMappingURL=validation.js.map