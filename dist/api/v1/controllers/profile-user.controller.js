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
exports.ProfileUserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const response_message_type_1 = require("../../../utils/response-message.type");
const services_1 = require("../../../services");
class ProfileUserController {
    static getProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.user;
                const result = yield services_1.ProfileUserService.get(token);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: response_message_type_1.RESPONSE_MESSAGE.success.read,
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.user;
                const reqBody = req.body;
                const result = yield services_1.ProfileUserService.changePassword(reqBody, token);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Kata sandi berhasil di ubah",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.ProfileUserController = ProfileUserController;
//# sourceMappingURL=profile-user.controller.js.map