"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeedActivation = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_error_1 = require("./custom-api-error");
class NeedActivation extends custom_api_error_1.CustomAPIError {
    constructor(message, email) {
        super(message, http_status_codes_1.StatusCodes.FORBIDDEN, email);
    }
}
exports.NeedActivation = NeedActivation;
//# sourceMappingURL=need-activation.js.map