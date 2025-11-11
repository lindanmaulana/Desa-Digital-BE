import { Router } from "express";
import { authenticatedUser } from "../../../../middlewares/auth";
import { publicRateLimit } from "../../../../middlewares/rateLimit";
import { UserController } from "../../controllers";

const userRouteCommon = Router();

	userRouteCommon.get("/", authenticatedUser, publicRateLimit, UserController.getUsers);
	userRouteCommon.get("/:id", authenticatedUser, publicRateLimit, UserController.getUserById);

export default userRouteCommon;
