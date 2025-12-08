import { Prisma } from "@prisma/client";
export declare const SocialAssistanceRepository: {
    create: (args: Prisma.SocialAssistanceCreateArgs) => Promise<$Result.GetResult<Prisma.$SocialAssistancePayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    update: (args: Prisma.SocialAssistanceUpdateArgs) => Promise<$Result.GetResult<Prisma.$SocialAssistancePayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
    findById: (id: string) => Promise<any>;
    findAll: (args: Prisma.SocialAssistanceFindManyArgs) => Promise<$Public.PrismaPromise<T>>;
    findOne: (id: string) => Promise<any>;
    findCount: (args: Prisma.SocialAssistanceCountArgs) => Promise<$Public.PrismaPromise<T>>;
    isNameTaken: (name: string) => Promise<boolean>;
    delete: (id: string) => Promise<$Result.GetResult<Prisma.$SocialAssistancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>>;
};
//# sourceMappingURL=social-assistance.repository.d.ts.map