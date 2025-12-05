import { NextFunction, Response } from "express";
import { CustomeRequest } from "../types/express.type";
import { ImagePath } from "../types/imagePath.type";
export declare const setDynamicUploadPath: (entityName: ImagePath) => (req: CustomeRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=setDynamicUploadPath.d.ts.map