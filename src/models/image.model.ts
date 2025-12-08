import { Entity, Prisma } from "@prisma/client";

// Model Main
export interface ImageResponse {
	id: string;
	filename: string;
	path: string;
	profile_id?: string | null;
	user_id?: string | null;
	social_assistance_id?: string | null;
	social_assistance_recipient_id?: string | null;
	event_id?: string | null;
	development_id?: string | null;
	entity_type: Entity;

	created_at: Date;
	updated_at: Date;
}

// Request
export interface ImageCreateRequest {
	profile_id?: string | null;
	user_id?: string | null;
	social_assistance_id?: string | null;
	social_assistance_recipient_id?: string | null;
	event_id?: string | null;
	development_id?: string | null;
}

export interface ImageUploadSocialAssistanceRequest {
	id: string
}

export interface ImageReuploadSocialAssistanceRequest {
	id: string
}

export interface ImageUploadSocialAssistanceRecipientRequest {
	id: string
}

// Raw Prisma
export type ImageSocialAssistanceGetOnePayload = Prisma.ImagesGetPayload<{
	select: {
		id: true,
		path: true,
		filename: true,
		social_assistance_id: true,
		entity_type: true,
		created_at: true,
		updated_at: true
	}
}>

// DTO

// Response API
