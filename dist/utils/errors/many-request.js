"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManyRequestError = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_api_error_1 = require("./custom-api-error");
class ManyRequestError extends custom_api_error_1.CustomAPIError {
    constructor(message) {
        super(message, http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS);
    }
}
exports.ManyRequestError = ManyRequestError;
//# sourceMappingURL=many-request.js.map