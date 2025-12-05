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
exports.ImageController = void 0;
const http_status_codes_1 = require("http-status-codes");
const image_service_1 = require("../../../services/image/image.service");
exports.ImageController = {
    socialAssistanceUpload: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reqFile = req.file;
            const reqParams = req.params;
            const result = yield image_service_1.ImageService.uploadSocialAssistanceImage(reqParams, reqFile);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                status: "success",
                code: http_status_codes_1.StatusCodes.CREATED,
                message: "Upload gambar berhasil.",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    }),
};
//# sourceMappingURL=image.controller.js.map