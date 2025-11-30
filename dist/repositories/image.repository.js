"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRepository = void 0;
const db_1 = require("../db");
exports.ImageRepository = {
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.findUnique({
            where: {
                id: id
            }
        });
    }),
    findByIdSocialAssistanceRecipient: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.findFirst({
            where: {
                social_assistance_recipient_id: id
            }
        });
    })
};
//# sourceMappingURL=image.repository.js.map