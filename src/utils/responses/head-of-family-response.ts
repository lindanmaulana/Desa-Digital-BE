import { HeadOfFamily } from "@prisma/client";
import {
	HeadOfFamilyGetAllDTO,
	HeadOfFamilyGetAllPayload,
	HeadOfFamilyGetOnePayload,
	HeadOfFamilyGetOneResponse,
	HeadOfFamilyResponse
} from "../../models/head-of-family.model";

export const toHeadOfFamilyResponse = {
	response: (headOfFamily: HeadOfFamily): HeadOfFamilyResponse => {
		return {
			id: headOfFamily.id,
			user_id: headOfFamily.user_id,
			identity_number: headOfFamily.identity_number,
			gender: headOfFamily.gender,
			date_of_birth: headOfFamily.date_of_birth,
			phone_number: headOfFamily.phone_number,
			occupation: headOfFamily.occupation,
			marital_status: headOfFamily.marital_status,

			created_at: headOfFamily.created_at,
			updated_at: headOfFamily.updated_at,
		};
	},

	listResponse: (headOfFamilies: HeadOfFamilyGetAllPayload[]): HeadOfFamilyGetAllDTO[] => {
		return headOfFamilies.map((headOfFamily) => ({
			id: headOfFamily.id,
			user_id: headOfFamily.user_id,
			identity_number: headOfFamily.identity_number,
			gender: headOfFamily.gender,
			date_of_birth: headOfFamily.date_of_birth,
			phone_number: headOfFamily.phone_number,
			occupation: headOfFamily.occupation,
			marital_status: headOfFamily.marital_status,

			user: {
				id: headOfFamily.user.id,
				name: headOfFamily.user.name,
				email: headOfFamily.user.email,
				role: headOfFamily.user.role,
				is_active: headOfFamily.user.is_active,
				is_first_login: headOfFamily.user.is_first_login,
				created_at: headOfFamily.user.created_at,
				updated_at: headOfFamily.user.updated_at
			},
			social_assistance_recipient: headOfFamily.social_assistance_recipient,

			created_at: headOfFamily.created_at,
			updated_at: headOfFamily.updated_at,
		}));
	},

	detailResponse: (headOfFamily: HeadOfFamilyGetOnePayload): HeadOfFamilyGetOneResponse => {
		return {
			id: headOfFamily.id,
			user_id: headOfFamily.user_id,
			identity_number: headOfFamily.identity_number,
			gender: headOfFamily.gender,
			date_of_birth: headOfFamily.date_of_birth,
			phone_number: headOfFamily.phone_number,
			occupation: headOfFamily.occupation,
			marital_status: headOfFamily.marital_status,

			user: headOfFamily.user,
			social_assistance_recipient: headOfFamily.social_assistance_recipient,

			created_at: headOfFamily.created_at,
			updated_at: headOfFamily.updated_at,
		};
	},
};
