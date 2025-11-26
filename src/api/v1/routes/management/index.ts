import { Router } from "express";
import headOfFamilyManagementRoute from "./head-of-family.route";
import socialAssistanceRecipientManagementRoute from "./social-assistance-recipient.route";
import socialAssistanceManagementRoute from "./social-assistance.route";

const managementRoute = Router()

	managementRoute.use("/head-of-families", headOfFamilyManagementRoute)
	managementRoute.use("/social-assistance", socialAssistanceManagementRoute)
	managementRoute.use("/social-assistance-recipients", socialAssistanceRecipientManagementRoute)

export default managementRoute
