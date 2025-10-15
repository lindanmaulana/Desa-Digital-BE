import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { CustomAPIError } from "../utils/errors";

export const errorMiddleware = async (error: Error, request: Request, res: Response, next: NextFunction) => {
	let statusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
	let errors: any = "Something went wrong, please try again later.";
	let responseData: any = { errors };

	if (error instanceof ZodError) {
		console.log("Zod Error");
		statusCodes = StatusCodes.BAD_REQUEST;
		errors = error.issues.map((e) => e.message);
		responseData = { errors };

	} else if (error instanceof CustomAPIError) {
		console.log("CustomApi Error");

		console.log({error})

		statusCodes = error.StatusCodes;
		errors = error.message;
		responseData = { errors };

		if (error.email) {
			responseData.email = error.email;
			responseData.status = "need_activation";
		}
	} else if (error instanceof Prisma.PrismaClientKnownRequestError) {
		console.log("Prisma client Error");

		statusCodes = StatusCodes.NOT_FOUND;
		errors = `Database error ${error.message}`;
	}

	res.status(statusCodes).json(responseData);
};
