import { UserRole } from "@prisma/client"

export type TypeToken = "ACCESS" | "VERIFY"

export interface BasePayloadToken {
	user_id: string
	role: UserRole
	type: TypeToken
}

export interface Token {
    id: string
    name: string
    email: string
    role: UserRole
	is_active: boolean
    is_first_login: boolean
}

export interface TokenVerification {
	id: string
	email: string
	purpose: string
	role: UserRole
}
