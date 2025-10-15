import { Gender, Marital, Relation } from "@prisma/client";

export interface FamilyMemberResponse {
	head_of_family_id: string
	user_id: string;
	profile_picture?: string;
	identity_number?: string;
	gender: Gender;
	date_of_birth?: Date;
	phone_number?: string;
	occupation?: string;
	marital_status: Marital;
	relation: Relation
	created_at: Date;
	updated_at: Date;
}
