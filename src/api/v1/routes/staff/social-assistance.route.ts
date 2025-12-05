import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import { setDynamicUploadPath } from "../../../../middlewares/setDynamicUploadPath";
import { SOCIALASSISTANCE_PATH } from "../../../../utils/const/images";
import { ImageController, SocialAssistanceController } from "../../controllers";
import uploadMiddleware from "../../../../middlewares/multer";

const socialAssistanceRouteStaff = Router()

	socialAssistanceRouteStaff.post("/:id/image/upload", authenticatedUser, authorizedRoles(UserRole.STAFF), setDynamicUploadPath(SOCIALASSISTANCE_PATH), uploadMiddleware.single("social-assistances"), adminRateLimit, ImageController.uploadImageSocialAssistance)
	socialAssistanceRouteStaff.put("/:id/image/update", authenticatedUser, authorizedRoles(UserRole.STAFF), setDynamicUploadPath(SOCIALASSISTANCE_PATH), uploadMiddleware.single("social-assistances"), adminRateLimit, ImageController.updateSocialAssistance)
	socialAssistanceRouteStaff.delete("/:id/delete", authenticatedUser, authorizedRoles(UserRole.STAFF), adminRateLimit, SocialAssistanceController.delete)

export default socialAssistanceRouteStaff
