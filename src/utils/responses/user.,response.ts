import { User } from "@prisma/client";
import { UserResponse, UserResponseWithRelation, UserWithRelations } from "../../models/user.model";
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

const toUserResponseWithRelation = (user: UserWithRelations): UserResponseWithRelation => {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: toUserRole(user.role),
		is_active: user.is_active,
		is_first_login: user.is_first_login,

		staff: user.staff && {
			id: user.staff.id,
			user_id: user.staff.user_id,
			identity_number: user.staff.identity_number ?? "",
			gender: user.staff.gender,
			date_of_birth: user.staff.date_of_birth?.toString() ?? "",
			phone_number: user.staff.phone_number ?? "",
			occupation: user.staff.occupation ?? "",
			marital_status: user.staff.marital_status,
			created_at: user.staff.created_at,
			updated_at: user.staff.updated_at,
		},

		image: user.image && {
			id: user.image.id,
			filename: user.image.filename,
			path: user.image.path,
			user_id: user.image.user_id ?? "",
			entity_type: user.image.entity_type,
			created_at: user.image.created_at,
			updated_at: user.image.updated_at,
		},

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

const toUserResponsesWithRelation = (users: UserWithRelations[]): UserResponseWithRelation[] => {
	return users.map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		role: toUserRole(user.role),
		is_active: user.is_active,
		is_first_login: user.is_first_login,

		staff: user.staff && {
			id: user.staff.id,
			user_id: user.staff.user_id,
			identity_number: user.staff.identity_number ?? "",
			gender: user.staff.gender,
			date_of_birth: user.staff.date_of_birth?.toString() ?? "",
			phone_number: user.staff.phone_number ?? "",
			occupation: user.staff.occupation ?? "",
			marital_status: user.staff.marital_status,
			created_at: user.staff.created_at,
			updated_at: user.staff.updated_at,
		},

		head_of_family: user.head_of_family && {
			id: user.head_of_family.id,
			user_id: user.head_of_family.user_id,
			identity_number: user.head_of_family.identity_number ?? "",
			gender: user.head_of_family.gender,
			date_of_birth: user.head_of_family.date_of_birth?.toString() ?? "",
			phone_number: user.head_of_family.phone_number ?? "",
			occupation: user.head_of_family.occupation ?? "",
			marital_status: user.head_of_family.marital_status,
			created_at: user.head_of_family.created_at,
			updated_at: user.head_of_family.updated_at,
		},

		image: user.image && {
			id: user.image.id,
			filename: user.image.filename,
			path: user.image.path,
			user_id: user.image.user_id ?? "",
			entity_type: user.image.entity_type,
			created_at: user.image.created_at,
			updated_at: user.image.updated_at,
		},

		created_at: user.created_at,
		updated_at: user.updated_at,
	}));
};

export default { toUserResponse, toUserResponses, toUserResponseWithRelation, toUserResponsesWithRelation };
