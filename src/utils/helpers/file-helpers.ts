import fs from "fs"

const checkImage = (pathImage: string): boolean => {
	return fs.existsSync(pathImage)
}

const deleteImage = (pathImage: string): void => {
	checkImage(pathImage) && fs.unlinkSync(pathImage)
}


export default {checkImage, deleteImage}
