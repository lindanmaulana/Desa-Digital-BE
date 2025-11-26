import { NextFunction, Response } from "express";
import { GetAllStaffRequest } from "../../../models/staff.model";
import { StaffCrudService } from "../../../services/staff/staff-crud.service";
import { CustomeRequest } from "../../../types/express.type";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGE } from "../../../utils/response-message.type";
import { TokenUser } from "../../../types/token.type";

export const StaffController = {
	getStaff: async (req: CustomeRequest, res: Response, next: NextFunction) => {
		try {
			const reqQuery = req.query as GetAllStaffRequest;
			const reqToken = req.cookies as TokenUser

			const result = await StaffCrudService.getAll(reqQuery, reqToken);

			res.status(StatusCodes.OK).json({
				status: "success",
				code: StatusCodes.OK,
				message: RESPONSE_MESSAGE.success.read,
				data: result.data,
				pagination: result.pagination,
			});
		} catch (err) {
			next(err)
		}
	},
};
