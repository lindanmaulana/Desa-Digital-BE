import { Request } from "express"
import multer, { FileFilterCallback } from "multer"
import path from "path"
import fs from "fs"

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const targetDir = (req as any).uploadPath || "temp"
		const fullPath = path.join(__dirname, "../../public", "images", targetDir)

		if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, {recursive: true})

		cb(null, fullPath)
	},


	filename: (req, file, cb) => {
		const fileExtension = path.extname(file.originalname)
		const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${fileExtension}`

		cb(null, fileName)
	}
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true)
    } else {
        cb(new Error("Unsupported file format"))
    }
}

const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter
})


export default uploadMiddleware
