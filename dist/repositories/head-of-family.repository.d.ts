import { Prisma } from "@prisma/client";
export declare class HeadOfFamilyRepository {
    static findById(id: string): Promise<any>;
    static findByUserId(userId: string): Promise<any>;
    static findAll(args: Prisma.HeadOfFamilyFindManyArgs): Promise<$Public.PrismaPromise<T>>;
    static findDetailById(id: string): Promise<any>;
    static findCount(args: Prisma.HeadOfFamilyCountArgs): Promise<$Public.PrismaPromise<T>>;
    static update(args: Prisma.HeadOfFamilyUpdateArgs): Promise<$Result.GetResult<Prisma.$HeadOfFamilyPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    static deleteUserById(id: string): Promise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>>;
}
//# sourceMappingURL=head-of-family.repository.d.ts.map