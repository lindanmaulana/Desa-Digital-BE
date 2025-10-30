import { Prisma, UserRole } from "@prisma/client";
import services from ".";
import { prismaClient } from "../db";
import {
	GetAllUserRequest,
	GetAllUserResponse,
	RegisterHeadOfFamilyRequest,
	RegisterStaffRequest,
	UserResponse
} from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { TokenUser } from "../types/token.type";
import CONSTS from "../utils/const/index";
import { BadrequestError, InternalServerError, NotfoundError } from "../utils/errors";
import helpers from "../utils/helpers";
import responses from "../utils/responses";
import { UserValidation } from "../utils/validations/user.validation";
import { validation } from "../utils/validations/validation";
import { generateUUID } from "../utils/helpers/generate-uuid";
import { createTokenVerifyAccount } from "../utils/helpers/jwt/create-token-verify-account";

export class UserService {
	static async registerStaffAccount(req: RegisterStaffRequest): Promise<UserResponse> {
		const validateFields = validation.validate(UserValidation.REGISTERSTAFF, req);

		const checkEmailTaken = await UserRepository.isEmailTaken(validateFields.email);

		if (checkEmailTaken) throw new BadrequestError("Email telah digunakan");

		const hashPassword = await helpers.hashPassword(validateFields.password);
		const otp = helpers.generateOtp();
		const jti = generateUUID()

		const result = await prismaClient.$transaction(async (tx) => {
			const newUser = await tx.user.create({
				data: {
					email: validateFields.email,
					name: validateFields.name,
					password: hashPassword,
					role: "STAFF",
					otp_code: otp,
					otp_last_sen_at: new Date(),
					verify_token: jti
				},
			});

			const newStaff = await tx.staff.create({
				data: {
					user_id: newUser.id,
					identity_number: validateFields.identity_number,
					gender: validateFields.gender,
					date_of_birth: validateFields.date_of_birth,
					phone_number: validateFields.phone_number,
					occupation: validateFields.occupation,
					marital_status: validateFields.marital_status,
				},
			});

			const newImage = await tx.images.create({
				data: {
					user_id: newUser.id,
					filename: "profile-user-default.png",
					path: CONSTS.images.USERPATH,
					entity_type: "USER",
				}
			})

			return { newUser, newStaff, newImage };
		});

		if (!result) throw new InternalServerError("Pendaftaran gagal, please try again later");

		const verify_token = createTokenVerifyAccount({user_id: result.newUser.id, jti, email: result.newUser.email, role: result.newUser.role, type: "VERIFY_ACCOUNT"})

		await services.EmailService.SendVerifyAccountMail(result.newUser.email, verify_token, result.newUser);

		return responses.userResponse.toUserResponse(result.newUser);
	}

	static async registerHeadOfFamilyAccount(req: RegisterHeadOfFamilyRequest) {
		const validateFields = validation.validate(UserValidation.REGISTERHEADOFFAMILY, req);

		const checkEmailTaken = await UserRepository.isEmailTaken(validateFields.email);

		if (checkEmailTaken) throw new BadrequestError("Email telah digunakan");

		const hashPassword = await helpers.hashPassword(validateFields.password);
		const otp = helpers.generateOtp();
		const jti = generateUUID()

		const result = await prismaClient.$transaction(async (tx) => {
			const newUser = await tx.user.create({
				data: {
					email: validateFields.email,
					name: validateFields.name,
					password: hashPassword,
					role: "HEAD_OF_FAMILY",
					otp_code: otp,
					otp_last_sen_at: new Date(),
					verify_token: jti
				},
			});

			const newHeadOfFamily = await tx.headOfFamily.create({
				data: {
					user_id: newUser.id,
					identity_number: validateFields.identity_number,
					gender: validateFields.gender,
					date_of_birth: validateFields.date_of_birth,
					phone_number: validateFields.phone_number,
					occupation: validateFields.occupation,
					marital_status: validateFields.marital_status,
				},
			});

			const newImage = await tx.images.create({
				data: {
					user_id: newUser.id,
					filename: "profile-user-default.png",
					path: CONSTS.images.USERPATH,
					entity_type: "USER",
				}
			})

			return { newUser, newHeadOfFamily, newImage };
		});

		if (!result) throw new InternalServerError("Pendaftaran gagal, please try again later");

		const verify_token = createTokenVerifyAccount({user_id: result.newUser.id, jti, email: result.newUser.email, role: result.newUser.role, type: "VERIFY_ACCOUNT"})
		await services.EmailService.SendVerifyAccountMail(result.newUser.email, verify_token, result.newUser);

		return responses.userResponse.toUserResponse(result.newUser);
	}

	static async getAll(req: GetAllUserRequest, user: TokenUser): Promise<GetAllUserResponse> {
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
				OR: [
					{
						name: {
							contains: validateFields.keyword,
							mode: "insensitive",
						},
					},
					{
						staff: {
							identity_number: {
								contains: validateFields.keyword,
								mode: "insensitive",
							},
						},
					},
					{
						head_of_family: {
							identity_number: {
								contains: validateFields.keyword,
								mode: "insensitive",
							},
						},
					},
				],
			};
		}

		if (validateFields.is_active) {
			whereCondition = {
				...whereCondition,
				is_active: validateFields.is_active,
			};
		}

		if (validateFields.role) {
			whereCondition = {
				...whereCondition,
				role: validateFields.role,
			};
		}

		let conditionsCount: Prisma.UserCountArgs = { where: whereCondition };

		const count = await UserRepository.findCount(conditionsCount);

		const { totalPage, links, nextPage, prevPage, page, limit, currentPage } = helpers.getPagination({
			count,
			pageRequest: validateFields.page,
			limitRequest: validateFields.limit,
		});

		let conditionsFindAll: Prisma.UserFindManyArgs = {
			where: whereCondition,
			skip: limit * (page - 1),
			take: limit,
			include: {
				staff: true,
				head_of_family: true,
				image: true
			},
			orderBy: {
				created_at: "desc"
			}
		};

		const result = await UserRepository.findAll(conditionsFindAll);

		if (!result) throw new InternalServerError("Gagal mengakses data user, please try again later!");

		return {
			data: responses.userResponse.toUserResponsesWithRelation(result),
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

	static async getById(id: string): Promise<UserResponse> {
		const result = await UserRepository.findById(id);

		if (!result) throw new NotfoundError(`Pengguna tidak ditemukan`);

		if (result.role === "ADMIN") throw new BadrequestError("Pengguna tidak ditemukan");

		return responses.userResponse.toUserResponseWithRelation(result);
	}

	static async delete(id: string): Promise<UserResponse> {
		const checkUser = await UserRepository.findById(id);

		if (!checkUser) throw new NotfoundError("Pengguna tidak ditemukan");

		if (checkUser.role === "ADMIN") throw new NotfoundError("Pengguna tidak dapat di hapus");

		const result = await UserRepository.deleteById(checkUser.id);

		return responses.userResponse.toUserResponse(result);
	}
}
