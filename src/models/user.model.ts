import { UserRole } from "@prisma/client";
import { PaginationResponse } from "./pagination.model";

export interface UserResponse {
	id: string;
	name: string;
	email: string;
	role: UserRole;
	otp_code?: string | null;
	otp_last_sen_at?: Date;
	is_active: boolean;
	is_first_login: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface GetAllUserResponse {
	data: UserResponse[]
	pagination: PaginationResponse
}

export interface ChangePasswordRequest {
	password: string;
	confirm_password: string;
}

export interface PaginationRequest {}

export interface GetAllRequest {
	keyword?: string;
	role?: UserRole;
	is_active?: boolean;
	page?: string;
	limit?: string;
}
