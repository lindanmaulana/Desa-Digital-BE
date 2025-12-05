"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.VALID_IMAGE_PATH = exports.VALID_ENTITY_IMAGE = exports.VALID_SORT = exports.VALID_BANK = exports.VALID_STATUS_SOCIAL_ASSISTANCE_RECIPIENT = exports.VALID_CATEGORY_SOCIAL_ASSISTANCE = exports.VALID_ROLE = exports.VALID_RELATION = exports.VALID_MARITAL = exports.VALID_GENDER = void 0;
const client_1 = require("@prisma/client");
exports.VALID_GENDER = [client_1.Gender.MALE, client_1.Gender.FEMALE];
exports.VALID_MARITAL = [client_1.Marital.MARRIED, client_1.Marital.SINGLE];
exports.VALID_RELATION = [client_1.Relation.HUSBAND, client_1.Relation.WIFE, client_1.Relation.CHILD];
exports.VALID_ROLE = [client_1.UserRole.ADMIN, client_1.UserRole.HEAD_OF_FAMILY, client_1.UserRole.RESIDENT, client_1.UserRole.STAFF];
exports.VALID_CATEGORY_SOCIAL_ASSISTANCE = [client_1.CategorySocialAssistance.CASH, client_1.CategorySocialAssistance.HEALTH, client_1.CategorySocialAssistance.STAPLE, client_1.CategorySocialAssistance.SUBSIDIZED_FUEL];
exports.VALID_STATUS_SOCIAL_ASSISTANCE_RECIPIENT = [client_1.Status.APPROVED, client_1.Status.PENDING, client_1.Status.REJECTED];
exports.VALID_BANK = [client_1.Bank.BCA, client_1.Bank.BNI, client_1.Bank.BRI, client_1.Bank.MANDIRI];
exports.VALID_SORT = ["asc", "desc"];
exports.VALID_ENTITY_IMAGE = [client_1.Entity.USER, client_1.Entity.PROFILE, client_1.Entity.SOCIAL_ASSISTANCE, client_1.Entity.SOCIAL_ASSISTANCE_RECIPIENT, client_1.Entity.EVENT, client_1.Entity.DEVELOPMENT];
exports.VALID_IMAGE_PATH = ["users", "profiles", "social-assistances", "social-assistance-recipients", "events", "developments"];
class validation {
    static validate(schema, data) {
        return schema.parse(data);
    }
}
exports.validation = validation;
//# sourceMappingURL=validation.js.map