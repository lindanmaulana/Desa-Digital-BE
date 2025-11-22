import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import { UserController } from "../../controllers";

const userRouteStaff = Router()

	userRouteStaff.post("/head-of-family/register", authenticatedUser, authorizedRoles(UserRole.STAFF), adminRateLimit, UserController.registerHeadOfFamily)

export default userRouteStaff
