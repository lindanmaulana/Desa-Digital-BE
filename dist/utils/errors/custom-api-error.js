"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomAPIError = void 0;
class CustomAPIError extends Error {
    constructor(message, statusCode, email) {
        var _a;
        super(message);
        this.StatusCodes = statusCode;
        this.email = (_a = email) !== null && _a !== void 0 ? _a : undefined;
    }
}
exports.CustomAPIError = CustomAPIError;
//# sourceMappingURL=custom-api-error.js.map