import { Router } from "express";
import { authenticatedUser } from "../../../middlewares/auth";
import { publicRateLimit } from "../../../middlewares/rateLimit";
import { UserController } from "../controllers";

const userRoutePublic = Router();


export default userRoutePublic;
