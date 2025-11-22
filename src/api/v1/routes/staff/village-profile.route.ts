import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { adminRateLimit } from "../../../../middlewares/rateLimit";
import { VillageProfileController } from "../../controllers";

const villageProfileRouteStaff = Router()


export default villageProfileRouteStaff
