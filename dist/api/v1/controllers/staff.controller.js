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
exports.StaffController = void 0;
const staff_crud_service_1 = require("../../../services/staff/staff-crud.service");
const http_status_codes_1 = require("http-status-codes");
const response_message_type_1 = require("../../../utils/response-message.type");
exports.StaffController = {
    getStaff: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reqQuery = req.query;
            const result = yield staff_crud_service_1.StaffCrudService.getAll(reqQuery);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: "success",
                code: http_status_codes_1.StatusCodes.OK,
                message: response_message_type_1.RESPONSE_MESSAGE.success.read,
                data: result.data,
                pagination: result.pagination,
            });
        }
        catch (err) {
            next(err);
        }
    }),
};
//# sourceMappingURL=staff.controller.js.map