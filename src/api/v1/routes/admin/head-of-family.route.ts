import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { HeadOfFamilyUserController } from "../../controllers/head-of-family.controller";
import { UserRole } from "@prisma/client";

const headOfFamilyRouteAdmin = Router();

headOfFamilyRouteAdmin.get("/", authenticatedUser, authorizedRoles("ADMIN"), HeadOfFamilyUserController.getHeadOfFamilies);
headOfFamilyRouteAdmin.get("/:id/detail", authenticatedUser, authorizedRoles(UserRole.ADMIN), HeadOfFamilyUserController.getHeadOfFamilyById)

export default headOfFamilyRouteAdmin;
