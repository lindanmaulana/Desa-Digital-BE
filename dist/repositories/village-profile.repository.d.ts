import { Prisma } from "@prisma/client";
export declare class VillageProfileRepository {
    static create(args: Prisma.ProfileCreateArgs): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        thumbnail: string;
        about: string;
        headman: string;
        people: number;
        agricultural_area: Prisma.Decimal;
        total_area: Prisma.Decimal;
    }>;
    static findOne(): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        thumbnail: string;
        about: string;
        headman: string;
        people: number;
        agricultural_area: Prisma.Decimal;
        total_area: Prisma.Decimal;
    } | null>;
    static findById(id: string): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        thumbnail: string;
        about: string;
        headman: string;
        people: number;
        agricultural_area: Prisma.Decimal;
        total_area: Prisma.Decimal;
    } | null>;
    static update(args: Prisma.ProfileUpdateArgs): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
        thumbnail: string;
        about: string;
        headman: string;
        people: number;
        agricultural_area: Prisma.Decimal;
        total_area: Prisma.Decimal;
    }>;
    static checkCount(): Promise<boolean>;
    static isTakenProfileName(name: string): Promise<boolean>;
}
//# sourceMappingURL=village-profile.repository.d.ts.map