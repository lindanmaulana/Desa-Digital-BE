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
exports.HeadOfFamilyService = void 0;
const head_of_family_validation_1 = require("../utils/validations/head-of-family.validation");
const validation_1 = require("../utils/validations/validation");
class HeadOfFamilyService {
    static create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const validateFields = validation_1.validation.validate(head_of_family_validation_1.HeadOfFamilyValidation.CREATE, req);
        });
    }
}
exports.HeadOfFamilyService = HeadOfFamilyService;
//# sourceMappingURL=head-of-family.service.js.map