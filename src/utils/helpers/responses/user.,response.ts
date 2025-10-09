import { User } from "@prisma/client";
import { UserResponse } from "../../../types/user.type";
import { toUserRole } from "../user-role";

export const toUserResponse = (user: User): UserResponse => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: toUserRole(user.role),
		otp_code: user.otp_code ?? "",
		is_first_login: user.is_first_login,
		is_active: user.is_active,
		created_at: user.created_at,
		updated_at: user.updated_at,
	};
};

export const toUserResponses = (users: User[]): UserResponse[] => {
	return users.map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		role: toUserRole(user.role),
		otp_code: user.otp_code ?? "",
		is_first_login: user.is_first_login,
		is_active: user.is_active,
		created_at: user.created_at,
		updated_at: user.updated_at,
	}));
};
