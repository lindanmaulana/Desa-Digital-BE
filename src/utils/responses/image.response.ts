import { ImageResponse, ImageSocialAssistanceGetOnePayload } from "../../models/image.model";

export const toImageResponse = {
	ImageSocialAssistanceResponse: (image: ImageSocialAssistanceGetOnePayload): ImageResponse => {
		return {
			id: image.id,
			path: image.path,
			filename: image.filename,
			social_assistance_id: image.social_assistance_id,
			entity_type: image.entity_type,
			created_at: image.created_at,
			updated_at: image.updated_at
		}
	}
}
