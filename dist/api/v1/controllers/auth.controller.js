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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = __importDefault(require("../../../services"));
class AuthController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield services_1.default.AuthService.signup(req.body);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Pendaftaran berhasil",
                    data: result,
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
                const result = yield services_1.default.AuthService.signin(req.body);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Login berhasil",
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
                const result = yield services_1.default.AuthService.changePassword(reqBody, token);
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
    static activation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const result = yield services_1.default.AuthService.activation(reqBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: "Aktivasi akun berhasil",
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map