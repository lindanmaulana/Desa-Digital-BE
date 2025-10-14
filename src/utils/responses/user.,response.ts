import { User } from "@prisma/client";
import { UserResponse } from "../../models/user.model";
import { toUserRole } from "../helpers/to-user-role";

const toUserResponse = (user: User): UserResponse => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: toUserRole(user.role),
		is_active: user.is_active,
		is_first_login: user.is_first_login,
		created_at: user.created_at,
		updated_at: user.updated_at,
	};
};

const toUserResponses = (users: User[]): UserResponse[] => {
	return users.map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		role: toUserRole(user.role),
		is_active: user.is_active,
		is_first_login: user.is_first_login,
		created_at: user.created_at,
		updated_at: user.updated_at,
	}));
};


export default {toUserResponse, toUserResponses}
