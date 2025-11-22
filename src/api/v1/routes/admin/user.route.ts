import { UserRole } from "@prisma/client";
import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import { UserController } from "../../controllers";

const userRouteAdmin = Router()

	userRouteAdmin.post("/staff/register", authenticatedUser, authorizedRoles(UserRole.ADMIN), adminRateLimit, UserController.registerStaff)
	userRouteAdmin.delete("/:id", authenticatedUser, authorizedRoles(UserRole.ADMIN), adminRateLimit, UserController.deleteUser);

export default userRouteAdmin
