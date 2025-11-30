import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { adminRateLimit, publicRateLimit } from "../../../../middlewares/rateLimit";
import { SocialAssistanceRecipientController } from "../../controllers/social-assistance-recipient.controller";

const socialAssistanceRecipientManagementRoute = Router()

	socialAssistanceRecipientManagementRoute.get("/", authenticatedUser, authorizedRoles(UserRole.ADMIN, UserRole.STAFF), adminRateLimit, SocialAssistanceRecipientController.getSocialAssistanceRecipients)
	socialAssistanceRecipientManagementRoute.get("/:id", authenticatedUser, publicRateLimit, SocialAssistanceRecipientController.getSocialAssistanceRecipientById)

export default socialAssistanceRecipientManagementRoute
