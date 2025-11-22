import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { HeadOfFamilyUserController } from "../../controllers/head-of-family.controller";
import { UserRole } from "@prisma/client";

const headOfFamilyRouteCommon = Router()

	headOfFamilyRouteCommon.get("/", authenticatedUser, authorizedRoles(UserRole.ADMIN, UserRole.STAFF), HeadOfFamilyUserController.getHeadOfFamilies);
	headOfFamilyRouteCommon.get("/:id/detail", authenticatedUser, authorizedRoles(UserRole.ADMIN, UserRole.STAFF), HeadOfFamilyUserController.getHeadOfFamilyById)

export default headOfFamilyRouteCommon
