"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDynamicUploadPath = void 0;
const setDynamicUploadPath = (entityName) => (req, res, next) => {
    req.uploadPath = entityName;
    next();
};
exports.setDynamicUploadPath = setDynamicUploadPath;
//# sourceMappingURL=setDynamicUploadPath.js.map