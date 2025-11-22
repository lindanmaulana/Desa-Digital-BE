import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { HeadOfFamilyUserController } from "../../controllers/head-of-family.controller";
import { UserRole } from "@prisma/client";

const headOfFamilyRouteAdmin = Router();


export default headOfFamilyRouteAdmin;
