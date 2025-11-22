import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import { SocialAssistanceController } from "../../controllers";

const socialAssistanceRouteStaff = Router()

	socialAssistanceRouteStaff.delete("/:id/delete", authenticatedUser, authorizedRoles(UserRole.STAFF), adminRateLimit, SocialAssistanceController.delete)

export default socialAssistanceRouteStaff
