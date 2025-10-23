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
exports.VillageProfileController = void 0;
const services_1 = __importDefault(require("../../../services"));
const http_status_codes_1 = require("http-status-codes");
const response_message_type_1 = require("../../../utils/response-message.type");
class VillageProfileController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = req.body;
                const result = yield services_1.default.VillageProfileService.create(reqBody);
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.CREATED,
                    message: response_message_type_1.RESPONSE_MESSAGE.success.create,
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqParams = req.params;
                const reqBody = req.body;
                const result = yield services_1.default.VillageProfileService.update(reqParams.id, reqBody);
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    code: http_status_codes_1.StatusCodes.OK,
                    message: response_message_type_1.RESPONSE_MESSAGE.success.update,
                    data: result,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield services_1.default.VillageProfileService.get();
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
}
exports.VillageProfileController = VillageProfileController;
//# sourceMappingURL=village-profile.controller.js.map