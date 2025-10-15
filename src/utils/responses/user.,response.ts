import { Prisma, Relation, User } from "@prisma/client";
import { UserResponse, UserResponseWithRelation, UserWithRelations } from "../../models/user.model";
import { toUserRole } from "../helpers/to-user-role";
import { prismaClient } from "../../db";

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
			profile_picture: user.staff.profile_picture ?? "",
			identity_number: user.staff.identity_number ?? "",
			gender: user.staff.gender,
			date_of_birth: user.staff.date_of_birth?.toString() ?? "",
			phone_number: user.staff.phone_number ?? "",
			occupation: user.staff.occupation ?? "",
			marital_status: user.staff.marital_status,
			created_at: user.staff.created_at,
			updated_at: user.staff.updated_at,
		},

		created_at: user.created_at,
		updated_at: user.updated_at,
	};
};

type UserResponses = Prisma.PromiseReturnType<typeof prismaClient.user.findMany> extends (infer T)[] ? T : never;

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
			profile_picture: user.staff.profile_picture ?? "",
			identity_number: user.staff.identity_number ?? "",
			gender: user.staff.gender,
			date_of_birth: user.staff.date_of_birth?.toString() ?? "",
			phone_number: user.staff.phone_number ?? "",
			occupation: user.staff.occupation ?? "",
			marital_status: user.staff.marital_status,
			created_at: user.staff.created_at,
			updated_at: user.staff.updated_at,
		},

		created_at: user.created_at,
		updated_at: user.updated_at,
	}));
};

export default { toUserResponse, toUserResponses, toUserResponseWithRelation, toUserResponsesWithRelation };
