import { Router } from "express";
import { authenticatedUser } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import controllers from "../../controllers";

const VillageProfileRouteCommon = Router()

	VillageProfileRouteCommon.get("/", authenticatedUser, publicRateLimit, controllers.VillageProfileController.get)

export default VillageProfileRouteCommon
