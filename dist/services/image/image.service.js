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
exports.ImageService = void 0;
const client_1 = require("@prisma/client");
const logging_1 = require("../../logging");
const image_repository_1 = require("../../repositories/image.repository");
const social_assistance_repository_1 = require("../../repositories/social-assistance.repository");
const images_1 = require("../../utils/const/images");
const errors_1 = require("../../utils/errors");
const helpers_1 = require("../../utils/helpers");
const image_response_1 = require("../../utils/responses/image.response");
const validations_1 = require("../../utils/validations");
const image_validation_1 = require("../../utils/validations/image.validation");
const fileHelpers_1 = require("../../utils/helpers/fileHelpers");
const path_1 = __importDefault(require("path"));
exports.ImageService = {
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
    uploadImageSocialAssistance: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        const validateFields = validations_1.validation.validate(image_validation_1.ImageValidation.UPLOAD_SOCIAL_ASSISTANCE, req);
        if (!file)
            throw new errors_1.NotfoundError("Field, 'image' wajib diisi. Silahkan unggah file gambarnya.");
        const checkSocialAssistance = yield social_assistance_repository_1.SocialAssistanceRepository.findById(validateFields.id);
        if (!checkSocialAssistance) {
            const deleteImageResult = yield (0, helpers_1.deleteImage)(images_1.SOCIALASSISTANCE_PATH, file.filename);
            if (!deleteImageResult)
                logging_1.logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path_1.default.join(images_1.BASEPATHIMAGE, images_1.SOCIALASSISTANCE_PATH, file.filename)}`);
            throw new errors_1.NotfoundError("Bantuan sosial tidak tersedia.");
        }
        const checkImageSocialAssistance = yield image_repository_1.ImageRepository.findBySocialAssistanceId(checkSocialAssistance.id);
        if (checkImageSocialAssistance) {
            const deleteImageResult = yield (0, helpers_1.deleteImage)(images_1.SOCIALASSISTANCE_PATH, file.filename);
            if (!deleteImageResult)
                logging_1.logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path_1.default.join(images_1.BASEPATHIMAGE, images_1.SOCIALASSISTANCE_PATH, file.filename)}`);
            throw new errors_1.BadrequestError("Gagal upload gambar bantuan sosial, maksimum 1 gambar untuk 1 bantuan sosial.");
        }
        const imagePayload = {
            path: images_1.SOCIALASSISTANCE_PATH,
            filename: file.filename,
            user_id: null,
            profile_id: null,
            social_assistance_id: checkSocialAssistance.id,
            social_assistance_recipient_id: null,
            event_id: null,
            development_id: null,
            entity: client_1.Entity.SOCIAL_ASSISTANCE,
        };
        const result = yield image_repository_1.ImageRepository.createBySocialAssistance(imagePayload);
        if (!result) {
            const deleteImageResult = yield (0, helpers_1.deleteImage)(images_1.SOCIALASSISTANCE_PATH, file.filename);
            if (!deleteImageResult)
                logging_1.logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path_1.default.join(images_1.BASEPATHIMAGE, images_1.SOCIALASSISTANCE_PATH, file.filename)}`);
            throw new errors_1.InternalServerError("Terjadi kesalahan saat upload image, please try again later.");
        }
        return image_response_1.toImageResponse.ImageSocialAssistanceResponse(result);
    }),
    updateImageSocialAssistance: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
        const validatedFields = validations_1.validation.validate(image_validation_1.ImageValidation.UPLOAD_SOCIAL_ASSISTANCE, req);
        if (!file)
            throw new errors_1.NotfoundError("Field, 'image' wajib diisi. Silahkan unggah file gambarnya.");
        const checkFile = yield (0, fileHelpers_1.fileExists)(images_1.SOCIALASSISTANCE_PATH, file.filename);
        if (!checkFile)
            throw new errors_1.NotfoundError("File gambar tidak ditemukan pada server. Silahkan unggah ulang gambar bantuan sosial.");
        const checkSocialAssistance = yield social_assistance_repository_1.SocialAssistanceRepository.findById(validatedFields.id);
        if (!checkSocialAssistance) {
            const deleteImageResult = yield (0, helpers_1.deleteImage)(images_1.SOCIALASSISTANCE_PATH, file.filename);
            if (!deleteImageResult)
                logging_1.logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path_1.default.join(images_1.BASEPATHIMAGE, images_1.SOCIALASSISTANCE_PATH, file.filename)}`);
            throw new errors_1.NotfoundError("Bantuan sosial tidak tersedia.");
        }
        const checkImageSocialAssistance = yield image_repository_1.ImageRepository.findBySocialAssistanceId(checkSocialAssistance.id);
        if (!checkImageSocialAssistance) {
            const deleteImageResult = yield (0, helpers_1.deleteImage)(images_1.SOCIALASSISTANCE_PATH, file.filename);
            if (!deleteImageResult)
                logging_1.logger.error(`Gagal menghapus gambar bantuan sosial yang tidak terpakai pada path: ${path_1.default.join(images_1.BASEPATHIMAGE, images_1.SOCIALASSISTANCE_PATH, file.filename)}`);
            throw new errors_1.NotfoundError("Gambar bantuan sosial tidak ditemukan, silahkan lakukan upload gambar terlebih dahulu.");
        }
        const imageUpdatePayload = {
            id: checkImageSocialAssistance.id,
            path: images_1.SOCIALASSISTANCE_PATH,
            filename: file.filename
        };
        const result = yield image_repository_1.ImageRepository.update(imageUpdatePayload);
        if (!result)
            throw new errors_1.InternalServerError("Terjadi kesalahan saat upload ulang gambar bantuan sosial, please try again later.");
        const deleteImageResult = yield (0, helpers_1.deleteImage)(images_1.SOCIALASSISTANCE_PATH, checkImageSocialAssistance.filename);
        if (!deleteImageResult)
            logging_1.logger.error(`Gagal menghapus gambar bantuan sosial lama dengan nama file - : ${checkImageSocialAssistance.filename}`);
        return image_response_1.toImageResponse.ImageSocialAssistanceResponse(result);
    })
};
//# sourceMappingURL=image.service.js.map