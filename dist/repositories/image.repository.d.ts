import { TypeImageCreateSchema, TypeImageUpdateSchema } from "../utils/validations/image.validation";
export declare const ImageRepository: {
    create: (req: TypeImageCreateSchema) => Promise<$Result.GetResult<import("@prisma/client").Prisma.$ImagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    createBySocialAssistance: (req: TypeImageCreateSchema) => Promise<$Result.GetResult<import("@prisma/client").Prisma.$ImagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>>;
    findById: (id: string) => Promise<any>;
    findCountByProfileId: (profileId: string) => Promise<$Public.PrismaPromise<T>>;
    findByUserId: (userId: string) => Promise<any>;
    findBySocialAssistanceId: (socialAssistanceId: string) => Promise<any>;
    findByIdSocialAssistanceRecipient: (id: string) => Promise<any>;
    update: (req: TypeImageUpdateSchema) => Promise<$Result.GetResult<import("@prisma/client").Prisma.$ImagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>>;
};
//# sourceMappingURL=image.repository.d.ts.map