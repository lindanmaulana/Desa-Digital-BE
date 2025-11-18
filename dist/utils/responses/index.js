"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.villageProfileResponse = exports.socialAssistanceResponse = exports.staffResponse = exports.toUserResponse = void 0;
const social_assistance_response_1 = require("./social-assistance-response");
Object.defineProperty(exports, "socialAssistanceResponse", { enumerable: true, get: function () { return social_assistance_response_1.socialAssistanceResponse; } });
const staff_response_1 = __importDefault(require("./staff-response"));
exports.staffResponse = staff_response_1.default;
const village_profile_response_1 = __importDefault(require("./village-profile.response"));
exports.villageProfileResponse = village_profile_response_1.default;
const user__response_1 = require("./user.,response");
Object.defineProperty(exports, "toUserResponse", { enumerable: true, get: function () { return user__response_1.toUserResponse; } });
//# sourceMappingURL=index.js.map