"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("./auth.service");
const email_service_1 = require("./email.service");
const staff_service_1 = require("./staff.service");
const user_service_1 = require("./user.service");
exports.default = {
    AuthService: auth_service_1.AuthService,
    UserService: user_service_1.UserService,
    EmailService: email_service_1.EmailService,
    StaffService: staff_service_1.StaffService
};
//# sourceMappingURL=index.js.map