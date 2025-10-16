import { ZodType } from "zod";
export declare const VALID_GENDER: [string, ...string[]];
export declare const VALID_MARITAL: [string, ...string[]];
export declare const VALID_ROLE: [string, ...string[]];
export declare const VALID_CATEGORY_SOCIAL_ASSISTANCE: [string, ...string[]];
export declare class validation {
    static validate<T>(schema: ZodType<T, any>, data: T): T;
}
//# sourceMappingURL=validation.d.ts.map