import { Router } from "express";
import { authenticatedUser } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import controllers from "../../controllers";

const userRouteCommon = Router();

	userRouteCommon.get("/", authenticatedUser, publicRateLimit, controllers.UserController.getUsers);
	userRouteCommon.get("/:id", authenticatedUser, publicRateLimit, controllers.UserController.getUserById);

	userRouteCommon.get("/me", authenticatedUser, publicRateLimit, controllers.UserController.getProfile);
	userRouteCommon.get("/me/password", authenticatedUser, publicRateLimit, controllers.UserController.changePassword);

export default userRouteCommon;
