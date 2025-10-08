import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CustomAPIError } from "../utils/errors";
import { Prisma } from "@prisma/client";

export const errorMiddleware = async (error: Error, request: Request, res: Response, next: NextFunction) => {
    if(error instanceof ZodError) {
        res.status(400).json({
            errors: error.issues.map(e => e.message)
          });

    } else if (error instanceof CustomAPIError) {
        res.status(error.StatusCodes).json({
            errors: error.message
        })
    }  else if(error instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(400).json({
            errors: `Database error ${error.message}`
        })
    } else {
        res.status(500).json({
            errors: "Something went wrong, please try again later."
        })
    }
}
