import { Router } from "express";
import { authenticatedUser } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import { VillageProfileController } from "../../controllers";

const villageProfileRouteCommon = Router();

	villageProfileRouteCommon.get("/", authenticatedUser, publicRateLimit, VillageProfileController.get)

export default villageProfileRouteCommon;
