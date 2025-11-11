import { Router } from "express";
import { authenticatedUser } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import { VillageProfileController } from "../../controllers";

const VillageProfileRouteCommon = Router()

	VillageProfileRouteCommon.get("/", authenticatedUser, publicRateLimit, VillageProfileController.get)

export default VillageProfileRouteCommon
