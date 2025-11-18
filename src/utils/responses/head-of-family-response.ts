import { HeadOfFamilyWithRelations, HeadOfFamilyWithRelationsResponse } from "../../models/head-of-family.model";

export const toHeadOfFamilyResponse = {
	response: (headOfFamily: HeadOfFamilyWithRelations): HeadOfFamilyWithRelationsResponse => {
		return {
			id: headOfFamily.id,
			user_id: headOfFamily.user_id,
			identity_number: headOfFamily.identity_number ?? "",
			gender: headOfFamily.gender,
			date_of_birth: headOfFamily.date_of_birth ? headOfFamily.date_of_birth.toString() : "",
			phone_number: headOfFamily.phone_number ?? "",
			occupation: headOfFamily.occupation ?? "",
			marital_status: headOfFamily.marital_status,

			user: headOfFamily.user,
			social_assistance_recipient: headOfFamily.sosial_assistance_recipient,

			created_at: headOfFamily.created_at,
			updated_at: headOfFamily.updated_at,
		};
	},

	responses: (headOfFamilies: HeadOfFamilyWithRelations[]): HeadOfFamilyWithRelationsResponse[] => {
		return headOfFamilies.map((headOfFamily) => ({
			id: headOfFamily.id,
			user_id: headOfFamily.user_id,
			identity_number: headOfFamily.identity_number ?? "",
			gender: headOfFamily.gender,
			date_of_birth: headOfFamily.date_of_birth ? headOfFamily.date_of_birth.toString() : "",
			phone_number: headOfFamily.phone_number ?? "",
			occupation: headOfFamily.occupation ?? "",
			marital_status: headOfFamily.marital_status,

			user: headOfFamily.user,
			social_assistance_recipient: headOfFamily.sosial_assistance_recipient,

			created_at: headOfFamily.created_at,
			updated_at: headOfFamily.updated_at,
		}));
	},
};
