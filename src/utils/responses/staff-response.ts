import { HeadOfFamily } from "@prisma/client";
import { HeadOfFamilyResponse } from "../../models/head-of-family.model";
import { StaffGetAllDto, StaffGetAllPayload } from "../../models/staff.model";

export const toStaffResponse = {
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

	listResponse: (staff: StaffGetAllPayload[]): StaffGetAllDto[] => {
		return staff.map((staff) => ({
			id: staff.id,
			user_id: staff.user_id,
			identity_number: staff.identity_number,
			gender: staff.gender,
			date_of_birth: staff.date_of_birth,
			phone_number: staff.phone_number,
			occupation: staff.occupation,
			marital_status: staff.marital_status,
			user: {
				id: staff.user.id,
				name: staff.user.name,
				email: staff.user.email,
				role: staff.user.role,
				is_active: staff.user.is_active,
				is_first_login: staff.user.is_first_login,
				created_at: staff.user.created_at,
				updated_at: staff.user.updated_at
			},

			created_at: staff.created_at,
			updated_at: staff.updated_at,
		}));
	},
};
