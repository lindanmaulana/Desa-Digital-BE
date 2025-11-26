"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSocialAssistanceResponse = void 0;
exports.toSocialAssistanceResponse = {
    response: (socialAssistance) => {
        return {
            id: socialAssistance.id,
            thumbnail: socialAssistance.thumbnail,
            name: socialAssistance.name,
            category: socialAssistance.category,
            amount: socialAssistance.amount,
            provider: socialAssistance.provider,
            description: socialAssistance.description,
            is_active: socialAssistance.is_active,
            created_at: socialAssistance.created_at,
            updated_at: socialAssistance.updated_at,
        };
    },
    listResponse: (socialAssistances) => {
        return socialAssistances.map((socialAssistance) => ({
            id: socialAssistance.id,
            thumbnail: socialAssistance.thumbnail,
            name: socialAssistance.name,
            category: socialAssistance.category,
            amount: socialAssistance.amount,
            provider: socialAssistance.provider,
            description: socialAssistance.description,
            is_active: socialAssistance.is_active,
            image: socialAssistance.image,
            social_assistance_recipient_count: socialAssistance._count.social_assistance_recipient,
            created_at: socialAssistance.created_at,
            updated_at: socialAssistance.updated_at,
        }));
    },
    detailResponse: (socialAssistance) => {
        return {
            id: socialAssistance.id,
            thumbnail: socialAssistance.thumbnail,
            name: socialAssistance.name,
            category: socialAssistance.category,
            amount: socialAssistance.amount,
            provider: socialAssistance.provider,
            description: socialAssistance.description,
            is_active: socialAssistance.is_active,
            image: socialAssistance.image,
            social_assistance_recipient: socialAssistance.social_assistance_recipient,
            social_assistance_recipient_count: socialAssistance._count.social_assistance_recipient,
            created_at: socialAssistance.created_at,
            updated_at: socialAssistance.updated_at,
        };
    },
};
//# sourceMappingURL=social-assistance-response.js.map