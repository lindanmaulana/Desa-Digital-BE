import { UserRole } from "@prisma/client"


export interface UserResponse {
    id: string
    name: string
    email: string
    role: UserRole
	otp_code?: string | null
	otp_last_sen_at?: Date
	is_active: boolean
    is_first_login: boolean
    created_at: Date
    updated_at: Date
}

export interface UserSignupRequest {
	name: string
	email: string
	password: string
	otp_code?: string
	otp_last_sen_at?: Date
}

export interface UserSigninRequest {
    email: string
    password: string
}

export interface UserSigninResponse extends UserResponse {
    token: string
}

export interface ChangePasswordRequest {
	password: string
	confirm_password: string
}

export interface ActivationRequest {
	email: string
	otp_code: string
}

export interface ResendOtpRequest {
	email: string
}

export interface ForgotPasswordRequest {
	email: string
}

export interface MatchOtpRequest {
	email: string
	otp_code: string
}

export interface MathOtpResponse {
	verify_token: string
}

export interface ResetPasswordRequest {
	password: string
	confirm_password: string
}
