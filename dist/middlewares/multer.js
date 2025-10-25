"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const targetDir = req.uploadPath || "temp";
        const fullPath = path_1.default.join(__dirname, "../../public", "images", targetDir);
        if (!fs_1.default.existsSync(fullPath))
            fs_1.default.mkdirSync(fullPath, { recursive: true });
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        const fileExtension = path_1.default.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`;
        cb(null, fileName);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg") {
        cb(null, true);
    }
    else {
        cb(new Error("Unsupported file format"));
    }
};
const uploadMiddleware = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter
});
exports.default = uploadMiddleware;
//# sourceMappingURL=multer.js.map