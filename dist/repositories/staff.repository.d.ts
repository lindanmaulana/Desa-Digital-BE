import { Prisma } from "@prisma/client";
export declare class StaffRepository {
    static create(args: Prisma.StaffCreateArgs): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        user_id: string;
        profile_picture: string | null;
        identity_number: string | null;
        gender: import("@prisma/client").$Enums.Gender;
        date_of_birth: Date | null;
        phone_number: string | null;
        occupation: string | null;
        marital_status: import("@prisma/client").$Enums.Marital;
    }>;
}
//# sourceMappingURL=staff.repository.d.ts.map