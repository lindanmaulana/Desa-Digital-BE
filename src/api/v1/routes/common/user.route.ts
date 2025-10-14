import { Router } from "express";
import { authenticatedUser, authorizedRoles } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import controllers from "../../controllers";
import { UserRole } from "@prisma/client";

const userRouteCommon = Router();

	userRouteCommon.get("/", authenticatedUser, publicRateLimit, controllers.UserController.getUsers);
	userRouteCommon.get("/:id", authenticatedUser, publicRateLimit, controllers.UserController.getUserById);

	userRouteCommon.get("/me", authenticatedUser, publicRateLimit, controllers.UserController.getProfile);
	userRouteCommon.get("/me/password", authenticatedUser, publicRateLimit, controllers.UserController.changePassword);

	userRouteCommon.delete("/:id", authenticatedUser, authorizedRoles(UserRole.ADMIN), controllers.UserController.deleteUser);

export default userRouteCommon;
