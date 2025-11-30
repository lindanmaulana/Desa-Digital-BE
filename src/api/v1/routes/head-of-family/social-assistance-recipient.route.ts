import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import { SocialAssistanceRecipientController } from "../../controllers/social-assistance-recipient.controller";

const socialAssistanceRecipientHeadOfFamilyRoute = Router()

	socialAssistanceRecipientHeadOfFamilyRoute.post("/", authenticatedUser, authorizedRoles(UserRole.HEAD_OF_FAMILY), publicRateLimit, SocialAssistanceRecipientController.create)

export default socialAssistanceRecipientHeadOfFamilyRoute
