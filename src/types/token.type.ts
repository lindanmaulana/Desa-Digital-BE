import { UserRole } from "@prisma/client"

export interface Token {
    id: string
    name: string
    email: string
    role: UserRole
	is_active: boolean
    is_first_login: boolean
}
