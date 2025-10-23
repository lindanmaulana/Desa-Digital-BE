import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import controllers from "../../controllers";
import { UserRole } from "@prisma/client";

const villageProfileRouteAdmin = Router()

	villageProfileRouteAdmin.post("/", authenticatedUser, authorizedRoles(UserRole.STAFF), adminRateLimit, controllers.VillageProfileController.create)
	villageProfileRouteAdmin.patch("/:id", authenticatedUser, authorizedRoles(UserRole.ADMIN), adminRateLimit, controllers.VillageProfileController.update)
	
export default villageProfileRouteAdmin
