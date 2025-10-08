"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
class validation {
    static validate(schema, data) {
        return schema.parse(data);
    }
}
exports.validation = validation;
//# sourceMappingURL=validation.js.map