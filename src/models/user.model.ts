import { Prisma, UserRole } from "@prisma/client";
import { SignupRequest } from "./auth.model";
import { PaginationResponse } from "./pagination.model";
import { StaffResponse } from "./staff.model";
import { HeadOfFamilyResponse } from "./head-of-family.model";
import { ImageResponse } from "./image.model";

export interface UserResponse {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	is_active: boolean;
	is_first_login: boolean;

	created_at: Date;
	updated_at: Date;
}

export type UserWithRelations = Prisma.UserGetPayload<{
	include: {
		staff: true;
		head_of_family: true;
		image: true;
	};

	omit: {
		password: true;
		otp: true;
		otp_last_sen_at: true;
		otp_purpose: true;
		reset_token: true;
		reset_token_last_sen_at: true;
		verify_token: true;
		verify_token_last_sen_at: true;
	};
}>;

export interface UserWithRelationResponse extends UserResponse {
	staff?: StaffResponse | null;
	head_of_family?: HeadOfFamilyResponse | null;
	image?: ImageResponse | null;
}

export interface ChangePasswordUserProfileRequest {
	password: string;
	confirm_password: string;
}

export interface UpdateUserProfileRequest {
	head_of_family_id?: string;
	profile_picture?: string;
	identity_number?: string;
	gender?: string;
	date_of_birth?: string;
	phone_number?: string;
	occupation?: string;
	marital_status?: string;
	relation?: string;
}

export interface GetAllUserRequest {
	keyword?: string;
	role?: UserRole;
	is_active?: string;
	page?: string;
	limit?: string;
}

export interface GetAllUserResponse {
	data: UserResponse[];
	pagination: PaginationResponse;
}

export interface RegisterHeadOfFamilyRequest extends SignupRequest {
	identity_number?: string;
	gender?: string;
	date_of_birth?: string;
	phone_number?: string;
	occupation?: string;
	marital_status?: string;
}

export interface RegisterStaffRequest extends SignupRequest {
	identity_number?: string;
	gender?: string;
	date_of_birth?: string;
	phone_number?: string;
	occupation?: string;
	marital_status?: string;
}
