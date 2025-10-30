import { UserRole } from "@prisma/client";

export type TypeToken = "ACCESS" | "VERIFY_ACCOUNT" | "RESET_PASSWORD";

export interface BasePayloadToken {
	user_id: string;
	role: UserRole;
	type: TypeToken;
}

export interface TokenUser extends BasePayloadToken {
	name: string;
	email: string;
	is_active: boolean;
	is_first_login: boolean;
}

export interface TokenResetPassword extends BasePayloadToken {
	email: string
}

export interface TokenVerifyAccount extends BasePayloadToken {
	jti: string
	email: string
}
