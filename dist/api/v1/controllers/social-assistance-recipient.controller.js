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
exports.SocialAssistanceRecipientController = void 0;
const http_status_codes_1 = require("http-status-codes");
const social_assistance_recipient_crud_service_1 = require("../../../services/social-assistance-recipient/social-assistance-recipient-crud.service");
const response_message_type_1 = require("../../../utils/response-message.type");
exports.SocialAssistanceRecipientController = {
    getSocialAssistanceRecipients: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reqToken = req.cookies;
            const reqQuery = req.query;
            const result = yield social_assistance_recipient_crud_service_1.SocialAssistanceRecipientCrudService.getAll(reqQuery, reqToken);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                status: "success",
                code: http_status_codes_1.StatusCodes.CREATED,
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
//# sourceMappingURL=social-assistance-recipient.controller.js.map