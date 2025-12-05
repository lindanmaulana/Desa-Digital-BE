import { Entity } from "@prisma/client";
import { logger } from "../../logging";
import { ImageResponse, ImageUploadSocialAssistanceRequest } from "../../models/image.model";
import { ImageRepository } from "../../repositories/image.repository";
import { SocialAssistanceRepository } from "../../repositories/social-assistance.repository";
import { BASEPATHIMAGE, SOCIALASSISTANCE_PATH } from "../../utils/const/images";
import { BadrequestError, InternalServerError, NotfoundError } from "../../utils/errors";
import { deleteImage } from "../../utils/helpers";
import { toImageResponse } from "../../utils/responses/image.response";
import { validation } from "../../utils/validations";
import { ImageValidation, TypeImageCreateSchema, TypeImageUpdateSchema } from "../../utils/validations/image.validation";
import { fileExists } from "../../utils/helpers/fileHelpers";
import path from "path";

export const ImageService = {
	// upload: async (file?: Express.Multer.File, req: ImageCreateRequest): Promise<ImageResponse> => {
	// 	// const validateFields = validation.validate(ImageValidation.CREATE, req);

	// 	// if (!file) throw new NotfoundError("Field 'image' wajib diisi. Silahkan unggah file gambar.");

	// 	// let newImage: ImageCreateRepositoryDto = {
	// 	// 	path: "temp",
	// 	// 	filename: "default-picture.png",
	// 	// 	entity: "PROFILE",
	// 	// };

	// 	// if (validateFields.profile_id) {
	// 	// 	const checkProfile = await VillageProfileRepository.findById(validateFields.profile_id);
	// 	// 	if (!checkProfile) throw new NotfoundError("Profile Desa tidak ditemukan.");

	// 	// 	const checkImageProfile = await ImageRepository.findCountByProfileId(checkProfile.id);
	// 	// 	if (checkImageProfile >= 5) {
	// 	// 		deleteImage(`${BASEPATHIMAGE}${PROFILE_PATH}/${file.filename}`);
	// 	// 		throw new BadrequestError("Foto Profile Desa telah mencapai jumlah maksimum yaitu 5 foto.");
	// 	// 	}

	// 	// 	newImage.path = "profile";
	// 	// 	newImage.filename = file.filename;
	// 	// 	newImage.entity = Entity.PROFILE;
	// 	// 	newImage.profile_id = checkProfile.id;
	// 	// }

	// 	// if (validateFields.user_id) {
	// 	// 	const checkUser = await UserRepository.findById(validateFields.user_id);
	// 	// 	if (!checkUser) {
	// 	// 		deleteImage(`${BASEPATHIMAGE}${USER_PATH}/${file.filename}`);
	// 	// 		throw new NotfoundError("Data pengguna tidak terdaftar.");
	// 	// 	}

	// 	// 	const checkImageUser = await ImageRepository.findByUserId(checkUser.id);
	// 	// 	if (checkImageUser) throw new BadrequestError("Foto anda sudah ada, harap untuk menghapus foto awalnya.");
	// 	// }

	// 	// if (validateFields.social_assistance_id) {
	// 	// 	const checkSocialAssistance = await SocialAssistanceRepository.findById(validateFields.social_assistance_id);
	// 	// 	if (!checkSocialAssistance) throw new NotfoundError("Data bantuan sosial tidak tersedia.");

	// 	// 	const checkImageSocialAssistance = await ImageRepository.findBySocialAssistanceId(checkSocialAssistance.id);
	// 	// 	// if (checkImageSocialAssistance)
	// 	// }

	// 	// const result = await ImageRepository.create(newImage);
	// },

	uploadImageSocialAssistance: async (req: ImageUploadSocialAssistanceRequest, file?: Express.Multer.File): Promise<ImageResponse> => {
		const validateFields = validation.validate(ImageValidation.UPLOAD_SOCIAL_ASSISTANCE, req);
		if (!file) throw new NotfoundError("Field, 'image' wajib diisi. Silahkan unggah file gambarnya.");

		const checkSocialAssistance = await SocialAssistanceRepository.findById(validateFields.id)
		if (!checkSocialAssistance) {
			const deleteImageResult = await deleteImage(SOCIALASSISTANCE_PATH, file.filename);
			if (!deleteImageResult) logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path.join(BASEPATHIMAGE, SOCIALASSISTANCE_PATH, file.filename)}`)

			throw new NotfoundError("Bantuan sosial tidak tersedia.")
		}

		const checkImageSocialAssistance = await ImageRepository.findBySocialAssistanceId(checkSocialAssistance.id)
		if (checkImageSocialAssistance) {
			const deleteImageResult = await deleteImage(SOCIALASSISTANCE_PATH, file.filename);
			if (!deleteImageResult) logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path.join(BASEPATHIMAGE, SOCIALASSISTANCE_PATH, file.filename)}`)

			throw new BadrequestError("Gagal upload gambar bantuan sosial, maksimum 1 gambar untuk 1 bantuan sosial.")
		}

		const imagePayload: TypeImageCreateSchema = {
			path: SOCIALASSISTANCE_PATH,
			filename: file.filename,
			user_id: null,
			profile_id: null,
			social_assistance_id: checkSocialAssistance.id,
			social_assistance_recipient_id: null,
			event_id: null,
			development_id: null,
			entity: Entity.SOCIAL_ASSISTANCE,
		}

		const result = await ImageRepository.createBySocialAssistance(imagePayload)
		if (!result) {
			const deleteImageResult = await deleteImage(SOCIALASSISTANCE_PATH, file.filename);
			if (!deleteImageResult) logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path.join(BASEPATHIMAGE, SOCIALASSISTANCE_PATH, file.filename)}`)

			throw new InternalServerError("Terjadi kesalahan saat upload image, please try again later.")
		}

		return toImageResponse.ImageSocialAssistanceResponse(result)
	},

	updateImageSocialAssistance: async (req: ImageUploadSocialAssistanceRequest, file?: Express.Multer.File): Promise<ImageResponse> => {
		const validatedFields = validation.validate(ImageValidation.UPLOAD_SOCIAL_ASSISTANCE, req)
		if (!file) throw new NotfoundError("Field, 'image' wajib diisi. Silahkan unggah file gambarnya.");

		const checkFile = await fileExists(SOCIALASSISTANCE_PATH, file.filename)
		if (!checkFile) throw new NotfoundError("File gambar tidak ditemukan pada server. Silahkan unggah ulang gambar bantuan sosial.");

		const checkSocialAssistance = await SocialAssistanceRepository.findById(validatedFields.id)
		if (!checkSocialAssistance) {
			const deleteImageResult = await deleteImage(SOCIALASSISTANCE_PATH, file.filename);
			if (!deleteImageResult) logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path.join(BASEPATHIMAGE, SOCIALASSISTANCE_PATH, file.filename)}`)
			throw new NotfoundError("Bantuan sosial tidak tersedia.")
		}

		const checkImageSocialAssistance = await ImageRepository.findBySocialAssistanceId(checkSocialAssistance.id)
		if (!checkImageSocialAssistance) {
			const deleteImageResult = await deleteImage(SOCIALASSISTANCE_PATH, file.filename);
			if (!deleteImageResult) logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path.join(BASEPATHIMAGE, SOCIALASSISTANCE_PATH, file.filename)}`)
			throw new NotfoundError("Gambar bantuan sosial tidak ditemukan, silahkan lakukan upload gambar terlebih dahulu.")
		}

		const imageUpdatePayload: TypeImageUpdateSchema = {
			id: checkImageSocialAssistance.id,
			path: SOCIALASSISTANCE_PATH,
			filename: file.filename
		}

		const result = await ImageRepository.update(imageUpdatePayload)
		if (!result) throw new InternalServerError("Terjadi kesalahan saat upload ulang gambar bantuan sosial, please try again later.")

		const deleteImageResult = await deleteImage(SOCIALASSISTANCE_PATH, checkImageSocialAssistance.filename)
		if (!deleteImageResult) logger.error(`Gagal menghapus gambar bantuan sosial lama dengan nama file - : ${checkImageSocialAssistance.filename}`)

		return toImageResponse.ImageSocialAssistanceResponse(result)
	}
};
