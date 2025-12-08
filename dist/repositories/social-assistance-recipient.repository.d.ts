import { Prisma } from "@prisma/client";
import { TypeSocialAssistanceRecipientCreateSchema, TypeSocialAssistanceRecipientUpdateSchema } from "../utils/validations";
export declare const SocialAssistanceRecipientRepository: {
    findAll: (args: Prisma.SocialAssistanceRecipientFindManyArgs) => Promise<$Public.PrismaPromise<T>>;
    findById: (id: string) => Promise<any>;
    findDetailById: (id: string) => Promise<any>;
    findCountBySocialAssistanceId: (id: string) => Promise<$Public.PrismaPromise<T>>;
    findCount: (args: Prisma.SocialAssistanceRecipientCountArgs) => Promise<$Public.PrismaPromise<T>>;
    findByHeadOfFamilyId: (headOfFamilyId: string, socialAssistanceId: string) => Promise<any>;
    create: (headOfFamilyId: string, req: TypeSocialAssistanceRecipientCreateSchema) => Promise<$Result.GetResult<Prisma.$SocialAssistanceRecipientPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    updateStatus: (id: string, req: TypeSocialAssistanceRecipientUpdateSchema) => Promise<$Result.GetResult<Prisma.$SocialAssistanceRecipientPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
};
//# sourceMappingURL=social-assistance-recipient.repository.d.ts.map