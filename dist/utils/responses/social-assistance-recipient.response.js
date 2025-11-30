"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSocialAssistanceRecipientResponse = void 0;
exports.toSocialAssistanceRecipientResponse = {
    response: (socialAssistanceRecipient) => {
        return {
            id: socialAssistanceRecipient.id,
            social_assistance_id: socialAssistanceRecipient.id,
            head_of_family_id: socialAssistanceRecipient.head_of_family_id,
            amount: socialAssistanceRecipient.amount,
            reason: socialAssistanceRecipient.reason,
            bank: socialAssistanceRecipient.bank,
            account_number: socialAssistanceRecipient.account_number,
            account_name: socialAssistanceRecipient.account_name,
            status: socialAssistanceRecipient.status,
            created_at: socialAssistanceRecipient.created_at,
            updated_at: socialAssistanceRecipient.updated_at
        };
    },
    listResponse: (socialAssistanceRecipients) => {
        return socialAssistanceRecipients.map(socialAssistanceRecipient => ({
            id: socialAssistanceRecipient.id,
            social_assistance_id: socialAssistanceRecipient.id,
            head_of_family_id: socialAssistanceRecipient.head_of_family_id,
            amount: socialAssistanceRecipient.amount,
            reason: socialAssistanceRecipient.reason,
            bank: socialAssistanceRecipient.bank,
            account_number: socialAssistanceRecipient.account_number,
            account_name: socialAssistanceRecipient.account_name,
            status: socialAssistanceRecipient.status,
            head_of_family: {
                id: socialAssistanceRecipient.head_of_family.id,
                occupation: socialAssistanceRecipient.head_of_family.occupation,
                user: {
                    id: socialAssistanceRecipient.head_of_family.user.id,
                    name: socialAssistanceRecipient.head_of_family.user.name
                }
            },
            social_assistance: {
                id: socialAssistanceRecipient.social_assistance.id,
                name: socialAssistanceRecipient.social_assistance.name,
                provider: socialAssistanceRecipient.social_assistance.provider,
                amount: socialAssistanceRecipient.social_assistance.amount,
                is_active: socialAssistanceRecipient.social_assistance.is_active
            },
            created_at: socialAssistanceRecipient.created_at,
            updated_at: socialAssistanceRecipient.updated_at
        }));
    },
    detailResponse: (socialAssistanceRecipient) => {
        return {
            id: socialAssistanceRecipient.id,
            social_assistance_id: socialAssistanceRecipient.social_assistance_id,
            head_of_family_id: socialAssistanceRecipient.head_of_family_id,
            amount: socialAssistanceRecipient.amount,
            reason: socialAssistanceRecipient.reason,
            bank: socialAssistanceRecipient.bank,
            account_number: socialAssistanceRecipient.account_number,
            account_name: socialAssistanceRecipient.account_name,
            status: socialAssistanceRecipient.status,
            social_assistance: {
                id: socialAssistanceRecipient.social_assistance.id,
                thumbnail: socialAssistanceRecipient.social_assistance.thumbnail,
                name: socialAssistanceRecipient.social_assistance.name,
                category: socialAssistanceRecipient.social_assistance.category,
                amount: socialAssistanceRecipient.social_assistance.amount,
                provider: socialAssistanceRecipient.social_assistance.provider,
                is_active: socialAssistanceRecipient.social_assistance.is_active,
                description: socialAssistanceRecipient.social_assistance.description,
                image: socialAssistanceRecipient.social_assistance.image && {
                    id: socialAssistanceRecipient.social_assistance.image.id,
                    path: socialAssistanceRecipient.social_assistance.image.path,
                    filename: socialAssistanceRecipient.social_assistance.image.filename,
                    social_assistance_id: socialAssistanceRecipient.social_assistance.image.social_assistance_id,
                    entity_type: socialAssistanceRecipient.social_assistance.image.entity_type,
                }
            },
            head_of_family: {
                id: socialAssistanceRecipient.head_of_family.id,
                occupation: socialAssistanceRecipient.head_of_family.occupation,
                user: {
                    id: socialAssistanceRecipient.head_of_family.user.id,
                    name: socialAssistanceRecipient.head_of_family.user.name,
                    family_member_count: socialAssistanceRecipient.head_of_family._count.family_member,
                    image: socialAssistanceRecipient.head_of_family.user.image && {
                        id: socialAssistanceRecipient.head_of_family.user.image.id,
                        path: socialAssistanceRecipient.head_of_family.user.image.path,
                        filename: socialAssistanceRecipient.head_of_family.user.image.filename,
                        entity_type: socialAssistanceRecipient.head_of_family.user.image.entity_type,
                        user_id: socialAssistanceRecipient.head_of_family.user.image.user_id
                    }
                }
            },
            created_at: socialAssistanceRecipient.created_at,
            updated_at: socialAssistanceRecipient.updated_at
        };
    }
};
//# sourceMappingURL=social-assistance-recipient.response.js.map