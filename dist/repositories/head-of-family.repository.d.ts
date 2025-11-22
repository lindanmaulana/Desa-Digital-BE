import { Prisma } from "@prisma/client";
export declare class HeadOfFamilyRepository {
    static findAll(args: Prisma.HeadOfFamilyFindManyArgs): Promise<({
        user: {
            image: {
                id: string;
                created_at: Date;
                updated_at: Date;
                user_id: string | null;
                filename: string;
                path: string;
                entity_type: import("@prisma/client").$Enums.Entity;
            } | null;
        } & {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            is_active: boolean;
            is_first_login: boolean;
            created_at: Date;
            updated_at: Date;
        };
        sosial_assistance_recipient: {
            id: string;
            created_at: Date;
            updated_at: Date;
            social_assistance_id: string;
            head_of_family_id: string;
            amount: Prisma.Decimal;
            reason: string;
            bank: import("@prisma/client").$Enums.Bank;
            account_number: string;
            status: import("@prisma/client").$Enums.Status;
        }[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        identity_number: string | null;
        gender: import("@prisma/client").$Enums.Gender;
        date_of_birth: Date | null;
        phone_number: string | null;
        occupation: string | null;
        marital_status: import("@prisma/client").$Enums.Marital;
    })[]>;
    static findByUserId(userId: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        identity_number: string | null;
        gender: import("@prisma/client").$Enums.Gender;
        date_of_birth: Date | null;
        phone_number: string | null;
        occupation: string | null;
        marital_status: import("@prisma/client").$Enums.Marital;
    } | null>;
    static findById(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        identity_number: string | null;
        gender: import("@prisma/client").$Enums.Gender;
        date_of_birth: Date | null;
        phone_number: string | null;
        occupation: string | null;
        marital_status: import("@prisma/client").$Enums.Marital;
    } | null>;
    static findByIdDetail(id: string): Promise<({
        user: {
            image: {
                id: string;
                created_at: Date;
                updated_at: Date;
                user_id: string | null;
                filename: string;
                path: string;
                entity_type: import("@prisma/client").$Enums.Entity;
            } | null;
        } & {
            name: string;
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            is_active: boolean;
            is_first_login: boolean;
            created_at: Date;
            updated_at: Date;
        };
        sosial_assistance_recipient: {
            id: string;
            created_at: Date;
            updated_at: Date;
            social_assistance_id: string;
            head_of_family_id: string;
            amount: Prisma.Decimal;
            reason: string;
            bank: import("@prisma/client").$Enums.Bank;
            account_number: string;
            status: import("@prisma/client").$Enums.Status;
        }[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        identity_number: string | null;
        gender: import("@prisma/client").$Enums.Gender;
        date_of_birth: Date | null;
        phone_number: string | null;
        occupation: string | null;
        marital_status: import("@prisma/client").$Enums.Marital;
    }) | null>;
    static findCount(args: Prisma.HeadOfFamilyCountArgs): Promise<number>;
    static update(args: Prisma.HeadOfFamilyUpdateArgs): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        identity_number: string | null;
        gender: import("@prisma/client").$Enums.Gender;
        date_of_birth: Date | null;
        phone_number: string | null;
        occupation: string | null;
        marital_status: import("@prisma/client").$Enums.Marital;
    }>;
    static deleteByIdUser(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        otp: string | null;
        otp_purpose: import("@prisma/client").$Enums.UserOtpPurpose | null;
        otp_last_sen_at: Date | null;
        verify_token: string | null;
        verify_token_last_sen_at: Date | null;
        reset_token: string | null;
        reset_token_last_sen_at: Date | null;
        is_active: boolean;
        is_first_login: boolean;
        created_at: Date;
        updated_at: Date;
    }>;
}
//# sourceMappingURL=head-of-family.repository.d.ts.map