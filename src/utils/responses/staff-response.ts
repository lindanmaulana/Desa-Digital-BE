import { Staff } from "@prisma/client";
import { StaffResponse } from "../../models/staff.model";

const toStaffResponse = (staff: Staff): StaffResponse => {
	return {
		id: staff.id,
		user_id: staff.user_id,
		profile_picture: staff.profile_picture ?? "",
		identity_number: staff.identity_number ?? "",
		gender: staff.gender ?? "",
		date_of_birth: staff.date_of_birth?.toString() ?? "",
		phone_number: staff.phone_number ?? "",
		occupation: staff.occupation ?? "",
		marital_status: staff.marital_status,

		created_at: staff.created_at,
		updated_at: staff.updated_at,
	};
};

const toStaffResponses = (staff: Staff[]): StaffResponse[] => {
	return staff.map((staf) => ({
		id: staf.id,
		user_id: staf.user_id,
		profile_picture: staf.profile_picture ?? "",
		identity_number: staf.identity_number ?? "",
		gender: staf.gender ?? "",
		date_of_birth: staf.date_of_birth?.toString() ?? "",
		phone_number: staf.phone_number ?? "",
		occupation: staf.occupation ?? "",
		marital_status: staf.marital_status,

		created_at: staf.created_at,
		updated_at: staf.updated_at,
	}));
};


export default {toStaffResponse, toStaffResponses}
