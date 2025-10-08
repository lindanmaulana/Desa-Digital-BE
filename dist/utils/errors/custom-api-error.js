"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = void 0;
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.StatusCodes = statusCode;
    }
}
exports.CustomAPIError = CustomAPIError;
//# sourceMappingURL=custom-api-error.js.map