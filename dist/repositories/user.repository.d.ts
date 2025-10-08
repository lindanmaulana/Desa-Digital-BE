import { UserSignupRequest } from "../types/user.type";
export declare class UserRepository {
    static findByEmail(email: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    } | null>;
    static isEmailTaken(email: string): Promise<boolean>;
    static create(data: UserSignupRequest): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }[]>;
}
//# sourceMappingURL=user.repository.d.ts.map