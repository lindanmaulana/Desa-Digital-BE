import { Router } from "express";
import { authenticatedUser } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import { SocialAssistanceController } from "../../controllers";

const socialAssistanceManagementRoute = Router()

	socialAssistanceManagementRoute.get("/", authenticatedUser, publicRateLimit, SocialAssistanceController.getSocialAssistances)
	socialAssistanceManagementRoute.get("/:id", authenticatedUser, publicRateLimit, SocialAssistanceController.getSocialAssistanceById)

export default socialAssistanceManagementRoute
