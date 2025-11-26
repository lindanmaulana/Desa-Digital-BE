import { Router } from "express";
import headOfFamilyManagementRoute from "./head-of-family.route";
import socialAssistanceRecipientManagementRoute from "./social-assistance-recipient.route";

const managementRoute = Router()

	managementRoute.use("/head-of-families", headOfFamilyManagementRoute)
	managementRoute.use("/social-assistance-recipients", socialAssistanceRecipientManagementRoute)

export default managementRoute
