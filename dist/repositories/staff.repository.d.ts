import { Prisma } from "@prisma/client";
export declare const StaffRepository: {
    findAll: (args: Prisma.StaffFindManyArgs) => Promise<({
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
        };
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
    findById: (id: string) => Promise<{
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
    findDetailById: (id: string) => Promise<({
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
        };
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
    findByUserId: (userId: string) => Promise<{
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
    findCount: (args: Prisma.StaffCountArgs) => Promise<number>;
    create: (args: Prisma.StaffCreateArgs) => Promise<{
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
    update: (args: Prisma.StaffUpdateArgs) => Promise<{
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
};
//# sourceMappingURL=staff.repository.d.ts.map