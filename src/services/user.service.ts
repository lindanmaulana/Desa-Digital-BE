import { Prisma, UserRole } from "@prisma/client";
import { UserResponse } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { Token } from "../types/token.type";
import { InternalServerError, NotfoundError } from "../utils/errors";
import responses from "../utils/responses";

export class UserService {
	static async getAll(user: Token): Promise<UserResponse[]> {
		let whereCondition: Prisma.UserWhereInput = {}

		const hiddenRoles = [UserRole.ADMIN]
		const fullAccess = user.role === UserRole.ADMIN

		if (!fullAccess) whereCondition = {
			role: {
				notIn: hiddenRoles
			}
		}

		const result = await UserRepository.findAll(whereCondition);

		if (!result) throw new InternalServerError("Gagal mengakses data user, please try again later!");

		return responses.toUserResponses(result);
	}

	static async getById(id: string): Promise<UserResponse> {
		const result = await UserRepository.findById(id);

		if (!result) throw new NotfoundError(`Pengguna tidak ditemukan`);

		return responses.toUserResponse(result);
	}

	static async delete(id: string): Promise<UserResponse> {
		const checkUser = await UserRepository.findById(id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		const result = await UserRepository.deleteById(checkUser.id);

		return responses.toUserResponse(result);
	}
}
