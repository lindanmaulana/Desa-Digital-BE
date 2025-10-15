import { Gender, Marital, Prisma } from "@prisma/client";

export interface CreateStaffRequest {
	user_id: string;
	profile_picture?: string;
	identity_number?: string;
	gender: string;
	date_of_birth?: string;
	phone_number?: string;
	occupation?: string;
	marital_status: string;
}


export interface StaffResponse {
	id: string
	user_id: string;
	profile_picture?: string;
	identity_number?: string;
	gender: Gender;
	date_of_birth?: string;
	phone_number?: string;
	occupation?: string;
	marital_status: Marital;

	created_at: Date
	updated_at: Date
}
