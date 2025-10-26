"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefined = void 0;
const removeUndefined = (obj) => {
    return Object.fromEntries(Object.fromEntries(obj).filter(([_, v]) => v !== undefined));
};
exports.removeUndefined = removeUndefined;
//# sourceMappingURL=remove-undefined.js.map