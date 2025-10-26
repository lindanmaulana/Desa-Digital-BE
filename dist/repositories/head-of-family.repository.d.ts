import { Prisma } from "@prisma/client";
export declare class HeadOfFamilyRepository {
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
}
//# sourceMappingURL=head-of-family.repository.d.ts.map