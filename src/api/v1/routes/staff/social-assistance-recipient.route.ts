import { Router } from "express"
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { setDynamicUploadPath } from "../../../../middlewares/setDynamicUploadPath"
import { SOCIALASSISTANCERECIPIENT_PATH } from "../../../../utils/const/images"
import uploadMiddleware from "../../../../middlewares/multer"
import { adminRateLimit } from "../../../../middlewares/rateLimit"
import { ImageController } from "../../controllers"

const socialAssistanceRecipientRouteStaff = Router()

	socialAssistanceRecipientRouteStaff.post("/:id/image/upload", authenticatedUser, authorizedRoles(UserRole.STAFF), setDynamicUploadPath(SOCIALASSISTANCERECIPIENT_PATH), uploadMiddleware.single("social-assistance-recipients"), adminRateLimit, ImageController.uploadImageSocialAssistanceRecipient)
	// socialAssistanceRecipientRouteStaff.delete("/:id/delete", authenticatedUser, authorizedRoles(UserRole.STAFF), adminRateLimit, SocialAssistanceController.delete)

export default socialAssistanceRecipientRouteStaff
