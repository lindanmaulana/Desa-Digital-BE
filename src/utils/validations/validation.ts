import { CategorySocialAssistance, Gender, Marital, UserRole } from "@prisma/client";
import z from "zod";

export const VALID_GENDER = [Gender.MALE, Gender.FEMALE] as const
export const VALID_MARITAL = [Marital.MARRIED, Marital.SINGLE] as const
export const VALID_ROLE = [UserRole.ADMIN, UserRole.HEAD_OF_FAMILY, UserRole.RESIDENT, UserRole.STAFF] as const
export const VALID_CATEGORY_SOCIAL_ASSISTANCE = [CategorySocialAssistance.CASH, CategorySocialAssistance.HEALTH, CategorySocialAssistance.STAPLE, CategorySocialAssistance.SUBSIDIZED_FUEL] as const


export class validation {
    static validate<T extends z.ZodType<any, any, any>>(schema: T, data: unknown): z.infer<T>{
        return schema.parse(data)
    }
    // static validate<T>(schema: ZodType<T, any>, data: T): T {
    //     return schema.parse(data)
    // }
}
