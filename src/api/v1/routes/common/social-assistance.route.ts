import { Router } from "express";
import { authenticatedUser } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import controllers from "../../controllers";

const socialAssistanceRouteCommon = Router()

	socialAssistanceRouteCommon.get("/", authenticatedUser, publicRateLimit, controllers.SocialAssistanceController.getSocialAssistances)

export default socialAssistanceRouteCommon
