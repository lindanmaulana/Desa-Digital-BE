import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import controllers from "../../controllers";

const userRouteAdmin = Router()

	userRouteAdmin.post("/staff/register", authenticatedUser, authorizedRoles(UserRole.ADMIN), adminRateLimit, controllers.UserController.registerStaff)
	userRouteAdmin.post("/head-of-family/register", authenticatedUser, authorizedRoles(UserRole.ADMIN, UserRole.STAFF), adminRateLimit, controllers.UserController.registerHeadOfFamily)

	userRouteAdmin.delete("/:id", authenticatedUser, authorizedRoles(UserRole.ADMIN), adminRateLimit, controllers.UserController.deleteUser);

export default userRouteAdmin
