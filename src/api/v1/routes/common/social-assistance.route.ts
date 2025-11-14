import { Router } from "express";
import { authenticatedUser } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import { SocialAssistanceController } from "../../controllers";

const socialAssistanceRouteCommon = Router()

	socialAssistanceRouteCommon.get("/", authenticatedUser, publicRateLimit, SocialAssistanceController.getSocialAssistances)
	socialAssistanceRouteCommon.get("/:id", authenticatedUser, publicRateLimit, SocialAssistanceController.getSocialAssistanceById)

export default socialAssistanceRouteCommon
