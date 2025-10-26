"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const checkImage = (pathImage) => {
    return fs_1.default.existsSync(pathImage);
};
const deleteImage = (pathImage) => {
    checkImage(pathImage) && fs_1.default.unlinkSync(pathImage);
};
exports.default = { checkImage, deleteImage };
//# sourceMappingURL=file-helpers.js.map