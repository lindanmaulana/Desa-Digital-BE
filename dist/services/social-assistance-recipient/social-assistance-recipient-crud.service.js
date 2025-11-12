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
exports.SocialAssistanceRecipientCrudService = void 0;
const errors_1 = require("../../utils/errors");
const social_assistance_recipient_validation_1 = require("../../utils/validations/social-assistance-recipient.validation");
const validation_1 = require("../../utils/validations/validation");
exports.SocialAssistanceRecipientCrudService = {
    create: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validation_1.validation.validate(social_assistance_recipient_validation_1.SocialAssistanceRecipientValidation.CREATE, req);
        if (validateFields.amount && validateFields.amount < 0)
            throw new errors_1.BadrequestError("Nominal bantuan tidak valid!");
    }),
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
    }),
};
//# sourceMappingURL=social-assistance-recipient-crud.service.js.map