import { ImageResponse, ImageUploadSocialAssistanceRecipientRequest, ImageUploadSocialAssistanceRequest } from "../../models/image.model";
export declare const ImageService: {
    uploadImageSocialAssistance: (req: ImageUploadSocialAssistanceRequest, file?: Express.Multer.File) => Promise<ImageResponse>;
    updateImageSocialAssistance: (req: ImageUploadSocialAssistanceRequest, file?: Express.Multer.File) => Promise<ImageResponse>;
    uploadImageSocialAssistanceRecipient: (req: ImageUploadSocialAssistanceRecipientRequest, file?: Express.Multer.File) => Promise<ImageResponse>;
};
//# sourceMappingURL=image.service.d.ts.map