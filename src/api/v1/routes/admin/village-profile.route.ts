import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import { UserRole } from "@prisma/client";
import { VillageProfileController } from "../../controllers";

const villageProfileRouteAdmin = Router()

	villageProfileRouteAdmin.post("/", authenticatedUser, authorizedRoles(UserRole.STAFF), adminRateLimit, VillageProfileController.create)
	villageProfileRouteAdmin.patch("/:id", authenticatedUser, authorizedRoles(UserRole.ADMIN), adminRateLimit, VillageProfileController.update)

export default villageProfileRouteAdmin
