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
exports.getFullPath = exports.fileExists = exports.deleteImage = void 0;
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const logging_1 = require("../../logging");
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 100;
const getFullPath = (rootName, fileName) => {
    const publicPath = node_path_1.default.join(__dirname, "..", "..", "..", "public", "images");
    return node_path_1.default.join(publicPath, rootName, fileName);
};
exports.getFullPath = getFullPath;
const fileExists = (rootName, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = getFullPath(rootName, fileName);
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            yield fs_1.default.promises.access(filePath, fs_1.default.constants.F_OK);
            return filePath;
        }
        catch (err) {
            if (attempt === MAX_RETRIES - 1) {
                logging_1.logger.error(`File tidak ditemukan pada path: ${filePath} setelah ${MAX_RETRIES} percobaan.`);
                return null;
            }
            const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
            yield new Promise(res => setTimeout(res, delay));
        }
    }
    return null;
});
exports.fileExists = fileExists;
const deleteImage = (rootName, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fullPath = yield fileExists(rootName, fileName);
        if (!fullPath)
            return false;
        logging_1.logger.info(`Gambar berhasil dihapus: ${fullPath}`);
        yield (0, promises_1.unlink)(fullPath);
        return true;
    }
    catch (err) {
        logging_1.logger.error(`Gagal menghapus gambar pada path: ${fileName}. Error: ${err.message}`);
        return false;
    }
});
exports.deleteImage = deleteImage;
//# sourceMappingURL=fileHelpers.js.map