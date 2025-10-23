"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const social_assistance_response_1 = __importDefault(require("./social-assistance-response"));
const staff_response_1 = __importDefault(require("./staff-response"));
const user__response_1 = __importDefault(require("./user.,response"));
const village_profile_response_1 = __importDefault(require("./village-profile.response"));
exports.default = {
    userResponse: user__response_1.default,
    staffResponse: staff_response_1.default,
    socialAssistanceResponse: social_assistance_response_1.default,
    villageProfileResponse: village_profile_response_1.default
};
//# sourceMappingURL=index.js.map