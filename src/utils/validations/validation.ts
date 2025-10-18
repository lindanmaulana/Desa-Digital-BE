import { CategorySocialAssistance, Gender, Marital, UserRole } from "@prisma/client";
import z, { ZodType } from "zod";

export const VALID_GENDER = Object.values(Gender) as [string, ...string[]]
export const VALID_MARITAL = Object.values(Marital) as [string, ...string[]]
export const VALID_ROLE = Object.values(UserRole) as [string, ...string[]]
export const VALID_CATEGORY_SOCIAL_ASSISTANCE = [CategorySocialAssistance.CASH, CategorySocialAssistance.HEALTH, CategorySocialAssistance.STAPLE, CategorySocialAssistance.SUBSIDIZED_FUEL] as const


export class validation {
    static validate<T extends z.ZodType<any, any, any>>(schema: T, data: unknown): z.infer<T>{
        return schema.parse(data)
    }
    // static validate<T>(schema: ZodType<T, any>, data: T): T {
    //     return schema.parse(data)
    // }
}
