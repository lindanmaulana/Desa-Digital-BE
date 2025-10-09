"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserRole = void 0;
const client_1 = require("@prisma/client");
const errors_1 = require("../errors");
const toUserRole = (role) => {
    if (Object.values(client_1.UserRole).includes(role)) {
        return role;
    }
    throw new errors_1.BadrequestError(`Invalid role: ${role}`);
};
exports.toUserRole = toUserRole;
//# sourceMappingURL=user-role.js.map