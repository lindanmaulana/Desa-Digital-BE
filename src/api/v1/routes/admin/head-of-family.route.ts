import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { HeadOfFamilyUserController } from "../../controllers/head-of-family.controller";

const headOfFamilyRouteAdmin = Router();

headOfFamilyRouteAdmin.use("/", authenticatedUser, authorizedRoles("ADMIN"), HeadOfFamilyUserController.getHeadOfFamilies);

export default headOfFamilyRouteAdmin;
