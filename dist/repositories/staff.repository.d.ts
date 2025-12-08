import { Prisma } from "@prisma/client";
export declare const StaffRepository: {
    findAll: (args: Prisma.StaffFindManyArgs) => Promise<$Public.PrismaPromise<T>>;
    findById: (id: string) => Promise<any>;
    findDetailById: (id: string) => Promise<any>;
    findByUserId: (userId: string) => Promise<any>;
    findCount: (args: Prisma.StaffCountArgs) => Promise<$Public.PrismaPromise<T>>;
    create: (args: Prisma.StaffCreateArgs) => Promise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    update: (args: Prisma.StaffUpdateArgs) => Promise<$Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
};
//# sourceMappingURL=staff.repository.d.ts.map