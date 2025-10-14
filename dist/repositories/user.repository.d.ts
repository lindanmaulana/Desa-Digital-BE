import { Prisma } from "@prisma/client";
export declare class UserRepository {
    static findCount(args: Prisma.UserCountArgs): Promise<number>;
    static findAll(args: Prisma.UserFindManyArgs): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }[]>;
    static findById(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    } | null>;
    static findByEmail(email: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    } | null>;
    static findUserForActivation(id: string): Promise<{
        id: string;
        otp_code: string | null;
        is_active: boolean;
    } | null>;
    static create(args: Prisma.UserCreateArgs): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static updatePassword(id: string, password: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static updateIsFirstLogin(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static updateIsActive(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static updateOtp(id: string, otp_code: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static deleteAll(): Promise<Prisma.BatchPayload>;
    static deleteById(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static deleteOtp(id: string, is_active: boolean): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp_code: string | null;
        otp_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
    static isEmailTaken(email: string): Promise<boolean>;
}
//# sourceMappingURL=user.repository.d.ts.map