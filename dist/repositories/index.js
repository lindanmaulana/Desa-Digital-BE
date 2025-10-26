"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const head_of_family_repository_1 = require("./head-of-family.repository");
const staff_repository_1 = require("./staff.repository");
const user_repository_1 = require("./user.repository");
const village_profile_repository_1 = require("./village-profile.repository");
exports.default = {
    UserRepository: user_repository_1.UserRepository,
    StaffRepository: staff_repository_1.StaffRepository,
    VillageProfileRepository: village_profile_repository_1.VillageProfileRepository,
    HeadOfFamilyRepository: head_of_family_repository_1.HeadOfFamilyRepository
};
//# sourceMappingURL=index.js.map