import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import { StaffController } from "../../controllers/staff.controller";

const staffRouteAdmin = Router()

	staffRouteAdmin.get("/", authenticatedUser, authorizedRoles(UserRole.ADMIN), adminRateLimit, StaffController.getStaff)

export default staffRouteAdmin
