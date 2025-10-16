"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toSocialAssistanceResponse = (socialAssistance) => {
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
};
const toSocialAssistanceResponses = (socialAssistances) => {
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
};
exports.default = { toSocialAssistanceResponse, toSocialAssistanceResponses };
//# sourceMappingURL=social-assistance-response.js.map