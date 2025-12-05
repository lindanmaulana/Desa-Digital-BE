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
    create: (req) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.create({
            data: {
                path: req.path,
                filename: req.filename,
                entity_type: req.entity,
            }
        });
    }),
    createBySocialAssistance: (req) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.create({
            data: {
                social_assistance_id: req.social_assistance_id,
                path: req.path,
                filename: req.filename,
                entity_type: req.entity,
            }
        });
    }),
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.findUnique({
            where: {
                id: id
            }
        });
    }),
    findCountByProfileId: (profileId) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.count({
            where: {
                profile_id: profileId
            }
        });
    }),
    findByUserId: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.findFirst({
            where: {
                user_id: userId
            }
        });
    }),
    findBySocialAssistanceId: (socialAssistanceId) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.findFirst({
            where: {
                social_assistance_id: socialAssistanceId
            }
        });
    }),
    findByIdSocialAssistanceRecipient: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.findFirst({
            where: {
                social_assistance_recipient_id: id
            }
        });
    }),
    update: (req) => __awaiter(void 0, void 0, void 0, function* () {
        return db_1.prismaClient.images.update({
            where: {
                id: req.id
            },
            data: {
                path: req.path,
                filename: req.filename
            }
        });
    })
};
//# sourceMappingURL=image.repository.js.map