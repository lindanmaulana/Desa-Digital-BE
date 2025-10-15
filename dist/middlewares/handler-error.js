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
exports.errorMiddleware = void 0;
const client_1 = require("@prisma/client");
const http_status_codes_1 = require("http-status-codes");
const zod_1 = require("zod");
const errors_1 = require("../utils/errors");
const errorMiddleware = (error, request, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCodes = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let errors = "Something went wrong, please try again later.";
    let responseData = { errors };
    if (error instanceof zod_1.ZodError) {
        console.log("Zod Error");
        statusCodes = http_status_codes_1.StatusCodes.BAD_REQUEST;
        errors = error.issues.map((e) => e.message);
        responseData = { errors };
    }
    else if (error instanceof errors_1.CustomAPIError) {
        console.log("CustomApi Error");
        console.log({ error });
        statusCodes = error.StatusCodes;
        errors = error.message;
        responseData = { errors };
        if (error.email) {
            responseData.email = error.email;
            responseData.status = "need_activation";
        }
    }
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        console.log("Prisma client Error");
        statusCodes = http_status_codes_1.StatusCodes.NOT_FOUND;
        errors = `Database error ${error.message}`;
    }
    res.status(statusCodes).json(responseData);
});
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=handler-error.js.map