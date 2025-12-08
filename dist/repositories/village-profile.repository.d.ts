import { Prisma } from "@prisma/client";
export declare class VillageProfileRepository {
    static create(args: Prisma.ProfileCreateArgs): Promise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    static findOne(): Promise<any>;
    static findById(id: string): Promise<any>;
    static update(args: Prisma.ProfileUpdateArgs): Promise<$Result.GetResult<Prisma.$ProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static checkCount(): Promise<boolean>;
    static isTakenProfileName(name: string): Promise<boolean>;
}
//# sourceMappingURL=village-profile.repository.d.ts.map