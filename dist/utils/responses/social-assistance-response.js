"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialAssistanceResponse = void 0;
exports.socialAssistanceResponse = {
    toSocialAssistanceResponse: (socialAssistance) => {
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
    toSocialAssistanceResponses: (socialAssistances) => {
        return socialAssistances.map((socialAssistance) => ({
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
        }));
    },
    toSocialAssistanceResponseWithRelation: (socialAssistance) => {
        return {
            id: socialAssistance.id,
            thumbnail: socialAssistance.thumbnail,
            name: socialAssistance.name,
            category: socialAssistance.category,
            amount: socialAssistance.amount,
            provider: socialAssistance.provider,
            description: socialAssistance.description,
            is_active: socialAssistance.is_active,
            image: socialAssistance.image && {
                id: socialAssistance.image.id,
                filename: socialAssistance.image.filename,
                path: socialAssistance.image.path,
                user_id: socialAssistance.image.user_id,
                social_assistance_id: socialAssistance.image.social_assistance_id,
                social_assistance_recipient_id: socialAssistance.image.social_assistance_recipient_id,
                event_id: socialAssistance.image.event_id,
                development_id: socialAssistance.image.development_id,
                entity_type: socialAssistance.image.entity_type,
                created_at: socialAssistance.image.created_at,
                updated_at: socialAssistance.image.updated_at,
            },
            created_at: socialAssistance.created_at,
            updated_at: socialAssistance.updated_at,
        };
    },
    toSocialAssistanceResponsesWithRelation: (socialAssistances) => {
        return socialAssistances.map((socialAssistance) => ({
            id: socialAssistance.id,
            thumbnail: socialAssistance.thumbnail,
            name: socialAssistance.name,
            category: socialAssistance.category,
            amount: socialAssistance.amount,
            provider: socialAssistance.provider,
            description: socialAssistance.description,
            is_active: socialAssistance.is_active,
            image: socialAssistance.image && socialAssistance.image,
            social_assistance_recipient: socialAssistance.social_assistance_recipient && socialAssistance.social_assistance_recipient,
            created_at: socialAssistance.created_at,
            updated_at: socialAssistance.updated_at,
        }));
    },
};
//# sourceMappingURL=social-assistance-response.js.map