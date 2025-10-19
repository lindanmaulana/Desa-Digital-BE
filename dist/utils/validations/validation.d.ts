import z from "zod";
export declare const VALID_GENDER: readonly ["MALE", "FEMALE"];
export declare const VALID_MARITAL: readonly ["MARRIED", "SINGLE"];
export declare const VALID_ROLE: readonly ["ADMIN", "HEAD_OF_FAMILY", "RESIDENT", "STAFF"];
export declare const VALID_CATEGORY_SOCIAL_ASSISTANCE: readonly ["CASH", "HEALTH", "STAPLE", "SUBSIDIZED_FUEL"];
export declare class validation {
    static validate<T extends z.ZodType<any, any, any>>(schema: T, data: unknown): z.infer<T>;
}
//# sourceMappingURL=validation.d.ts.map