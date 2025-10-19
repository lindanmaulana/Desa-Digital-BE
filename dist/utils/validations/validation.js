"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.VALID_CATEGORY_SOCIAL_ASSISTANCE = exports.VALID_ROLE = exports.VALID_MARITAL = exports.VALID_GENDER = void 0;
const client_1 = require("@prisma/client");
exports.VALID_GENDER = [client_1.Gender.MALE, client_1.Gender.FEMALE];
exports.VALID_MARITAL = [client_1.Marital.MARRIED, client_1.Marital.SINGLE];
exports.VALID_ROLE = [client_1.UserRole.ADMIN, client_1.UserRole.HEAD_OF_FAMILY, client_1.UserRole.RESIDENT, client_1.UserRole.STAFF];
exports.VALID_CATEGORY_SOCIAL_ASSISTANCE = [client_1.CategorySocialAssistance.CASH, client_1.CategorySocialAssistance.HEALTH, client_1.CategorySocialAssistance.STAPLE, client_1.CategorySocialAssistance.SUBSIDIZED_FUEL];
class validation {
    static validate(schema, data) {
        return schema.parse(data);
    }
}
exports.validation = validation;
//# sourceMappingURL=validation.js.map