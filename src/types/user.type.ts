import { UserRole } from "@prisma/client"


export interface UserResponse {
    id: string
    name: string
    email: string
    role: UserRole
	is_active: boolean
    is_first_login: boolean
    created_at: Date
    updated_at: Date
}

export interface UserSignupRequest {
	name: string
	email: string
	password: string
}

export interface UserSigninRequest {
    email: string
    password: string
}

export interface UserSigninResponse extends UserResponse {
    token: string
}
