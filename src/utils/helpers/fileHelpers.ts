import fs from "fs";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { logger } from "../../logging";
import { ImagePath } from "../../types/imagePath.type";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 100;

const getFullPath = (rootName: ImagePath, fileName: string): string => {
	const publicPath = path.join(__dirname, "..", "..", "..", "public", "images");

	return path.join(publicPath, rootName, fileName);
}

const fileExists = async (rootName: ImagePath, fileName: string): Promise<string | null> => {
	const filePath = getFullPath(rootName, fileName);

	for(let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			await fs.promises.access(filePath, fs.constants.F_OK);

			return filePath;
		} catch (err) {
			if (attempt === MAX_RETRIES - 1) {
				logger.error(`File tidak ditemukan pada path: ${filePath} setelah ${MAX_RETRIES} percobaan.`);
				return null;
			}

			const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
			await new Promise(res => setTimeout(res, delay));
		}
	}

	return null
};

const deleteImage = async (rootName: ImagePath, fileName: string): Promise<boolean> => {
	try {
		const fullPath = await fileExists(rootName, fileName);

		if (!fullPath) return false

		logger.info(`Gambar berhasil dihapus: ${fullPath}`)
		await unlink(fullPath);
		return true;
	} catch (err) {
		logger.error(`Gagal menghapus gambar pada path: ${fileName}. Error: ${(err as Error).message}`);

		return false;
	}
};

export { deleteImage, fileExists, getFullPath };

