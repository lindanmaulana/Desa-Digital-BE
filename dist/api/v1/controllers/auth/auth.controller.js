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
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const services_1 = require("../../../../services");
exports.AuthController = {
    signin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield services_1.AuthService.signin(req.body);
            res.cookie("jwt", result.token, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === ""
                // secure: false,
                maxAge: 1 * 24 * 60 * 60 * 1000,
                // sameSite: "lax"
            });
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: "success",
                code: http_status_codes_1.StatusCodes.OK,
                message: "Login berhasil",
                data: {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    role: result.role,
                    is_active: result.is_active,
                    is_first_login: result.is_first_login,
                    created_at: result.created_at,
                    updated_at: result.updated_at,
                },
            });
        }
        catch (err) {
            next(err);
        }
    }),
};
//# sourceMappingURL=auth.controller.js.map