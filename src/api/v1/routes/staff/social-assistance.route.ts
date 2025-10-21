import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import controllers from "../../controllers";

const socialAssistanceRouteStaff = Router()

	socialAssistanceRouteStaff.post("/", authenticatedUser, authorizedRoles(UserRole.STAFF), adminRateLimit, controllers.SocialAssistanceController.create)
	socialAssistanceRouteStaff.patch("/:id", authenticatedUser, authorizedRoles(UserRole.STAFF), adminRateLimit, controllers.SocialAssistanceController.update)

export default socialAssistanceRouteStaff
