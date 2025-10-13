import { Prisma, UserRole } from "@prisma/client";
import { ChangePasswordRequest, GetAllRequest, GetAllUserResponse, UserResponse } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { Token } from "../types/token.type";
import paginationConst from "../utils/const/pagination.const";
import { BadrequestError, InternalServerError, NotfoundError } from "../utils/errors";
import { UnauthorizedError } from "../utils/errors/unauthorized";
import helpers from "../utils/helpers";
import responses from "../utils/responses";
import { UserValidation } from "../utils/validations/user.validation";
import { validation } from "../utils/validations/validation";
import { getPagination } from "../utils/helpers/get-pagination";
import { ROLES } from "../utils/const/roles";
import { Roles } from "../types/roles";

export class UserService {
	static async getProfile(user: Token): Promise<UserResponse> {
		const checkUser = await UserRepository.findById(user.id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		return responses.toUserResponse(checkUser);
	}

	static async getAll(req: GetAllRequest, user: Token): Promise<GetAllUserResponse> {
		const validateFields = validation.validate(UserValidation.GETALL, req);

		const hiddenRoles = [UserRole.ADMIN];
		const fullAccess = user.role === UserRole.ADMIN;

		let whereCondition: Prisma.UserWhereInput = {};

		if (!fullAccess) {
			whereCondition = {
				...whereCondition,
				role: {
					notIn: hiddenRoles,
				},
			};
		}

		if (validateFields.keyword) {
			whereCondition = {
				...whereCondition,
				name: {
					contains: validateFields.keyword,
					mode: "insensitive",
				},
			};
		}

		if (validateFields.is_active) {
			const isActive: boolean = validateFields.is_active === "true";

			whereCondition = {
				...whereCondition,
				is_active: isActive,
			};
		}

		if (validateFields.role && Object.values(UserRole).includes(validateFields.role as UserRole)) {
			const searchRole = validateFields.role as UserRole;

			whereCondition = {
				...whereCondition,
				role: searchRole,
			};
		}

		let conditionsCount: Prisma.UserCountArgs = {where: whereCondition}

		const count = await UserRepository.findCount(conditionsCount);

		const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = helpers.getPagination({
			count,
			pageRequest: validateFields.page,
			limitRequest: validateFields.limit,
		});

		let conditionsFindMany: Prisma.UserFindManyArgs = {
			where: whereCondition,
			skip: limit * (page - 1),
			take: limit,
		};

		const result = await UserRepository.findAll(conditionsFindMany);

		if (!result) throw new InternalServerError("Gagal mengakses data user, please try again later!");

		return {
			data: responses.toUserResponses(result),
			pagination: {
				total_page: totalPage,
				limit,
				current_page: currentPage,
				links,
				next_page: nextPage,
				prev_page: prevPage,
			},
		};
	}

	static async getById(id: string, user: Token): Promise<UserResponse> {
		const result = await UserRepository.findById(id);

		if (!result) throw new NotfoundError(`Pengguna tidak ditemukan`);

		if (user.role !== "ADMIN" && user.role !== "STAFF")
			if (result.role === "ADMIN" || result.role === "STAFF") throw new BadrequestError("Pengguna tidak ditemukan");

		return responses.toUserResponse(result);
	}

	static async delete(id: string): Promise<UserResponse> {
		const checkUser = await UserRepository.findById(id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		if (checkUser.role === "ADMIN") throw new NotfoundError("Pengguna tidak dapat di hapus");

		const result = await UserRepository.deleteById(checkUser.id);

		return responses.toUserResponse(result);
	}

	static async changePassword(req: ChangePasswordRequest, user: Token): Promise<UserResponse> {
		const validateFields = validation.validate(UserValidation.CHANGEPASSWORD, req);

		if (validateFields.password !== validateFields.confirm_password) throw new BadrequestError("Password dan Konfirm password tidak sama");

		const checkUser = await UserRepository.findById(user.id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak di temukan");

		if (!checkUser.is_active) throw new UnauthorizedError("Akun belum aktif, Mohon verifikasi email anda untuk mengaktifkan akun");

		const newHasPassword = await helpers.hashPassword(validateFields.password);

		const result = await UserRepository.updatePassword(checkUser.id, newHasPassword);

		if (checkUser.is_first_login) await UserRepository.updateIsFirstLogin(checkUser.id);

		if (!result) throw new InternalServerError("Terjadi kesalahan, please try again later");

		return responses.toUserResponse(result);
	}
}
