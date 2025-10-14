import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import controllers from "../../controllers";
import { UserRole } from "@prisma/client";

const userRouteAdmin = Router()

	userRouteAdmin.post("/staff", authenticatedUser, authorizedRoles(UserRole.ADMIN), publicRateLimit, controllers.UserController.registerStaff)

export default userRouteAdmin
