"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATH_MAP_IMAGE = void 0;
const client_1 = require("@prisma/client");
exports.PATH_MAP_IMAGE = {
    [client_1.Entity.PROFILE]: client_1.Entity.PROFILE.toLowerCase(),
    [client_1.Entity.USER]: client_1.Entity.USER.toLowerCase(),
    [client_1.Entity.SOCIAL_ASSISTANCE]: "social-assistance",
    [client_1.Entity.SOCIAL_ASSISTANCE_RECIPIENT]: "social-assistance-recipient",
    [client_1.Entity.EVENT]: client_1.Entity.EVENT.toLowerCase(),
    [client_1.Entity.DEVELOPMENT]: client_1.Entity.DEVELOPMENT.toLowerCase(),
};
//# sourceMappingURL=pathMapImage.js.map