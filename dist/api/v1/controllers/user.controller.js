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
exports.UserController = void 0;
const user_services_1 = require("../../../services/user.services");
const http_status_codes_1 = require("http-status-codes");
const response_message_type_1 = require("../../../utils/response-message.type");
class UserController {
    static findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_services_1.UserService.getAll();
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: response_message_type_1.RESPONSE_MESSAGE.success.read,
                    data: result
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_services_1.UserService.signup(req.body);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Pendaftaran berhasil",
                    data: result
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static signin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_services_1.UserService.signin(req.body);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Login berhasil",
                    data: result
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map