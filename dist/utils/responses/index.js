"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.villageProfileResponse = exports.toSocialAssistanceResponse = exports.toStaffResponse = exports.toUserResponse = void 0;
const social_assistance_response_1 = require("./social-assistance-response");
Object.defineProperty(exports, "toSocialAssistanceResponse", { enumerable: true, get: function () { return social_assistance_response_1.toSocialAssistanceResponse; } });
const village_profile_response_1 = __importDefault(require("./village-profile.response"));
exports.villageProfileResponse = village_profile_response_1.default;
const user_response_1 = require("./user.response");
Object.defineProperty(exports, "toUserResponse", { enumerable: true, get: function () { return user_response_1.toUserResponse; } });
const staff_response_1 = require("./staff-response");
Object.defineProperty(exports, "toStaffResponse", { enumerable: true, get: function () { return staff_response_1.toStaffResponse; } });
//# sourceMappingURL=index.js.map