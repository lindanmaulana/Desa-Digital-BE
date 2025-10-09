import { UserSignupRequest } from "../types/user.type";
export declare class UserRepository {
    static findByEmail(email: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    } | null>;
    static findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }[]>;
    static findById(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    } | null>;
    static create(data: UserSignupRequest): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static deleteAll(): Promise<import("@prisma/client").Prisma.BatchPayload>;
    static deleteById(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static isEmailTaken(email: string): Promise<boolean>;
}
//# sourceMappingURL=user.repository.d.ts.map