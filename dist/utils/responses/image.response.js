"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toImageResponse = void 0;
exports.toImageResponse = {
    ImageSocialAssistanceResponse: (image) => {
        return {
            id: image.id,
            path: image.path,
            filename: image.filename,
            social_assistance_id: image.social_assistance_id,
            entity_type: image.entity_type,
            created_at: image.created_at,
            updated_at: image.updated_at
        };
    }
};
//# sourceMappingURL=image.response.js.map