"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const email_service_1 = require("./email.service");
const user_profile_service_1 = require("./user-profile.service");
const social_assistance_service_1 = require("./social-assistance.service");
const staff_service_1 = require("./staff.service");
const user_service_1 = require("./user.service");
const village_profile_service_1 = require("./village-profile.service");
exports.default = {
    AuthService: auth_service_1.AuthService,
    UserService: user_service_1.UserService,
    StaffService: staff_service_1.StaffService,
    SocialAssistanceService: social_assistance_service_1.SocialAssistanceService,
    UserProfileService: user_profile_service_1.UserProfileService,
    EmailService: email_service_1.EmailService,
    VillageProfileService: village_profile_service_1.VillageProfileService
};
//# sourceMappingURL=index.js.map