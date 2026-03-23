
import {type Request, type Response, type NextFunction} from "express"
import { ZodError } from "zod"
import { ServiceError } from "./ServiceError.js";
import sendResponse from "../controller/sendResponse.js";
export default function errorsHandler(error: Error, req: Request, res: Response, next: NextFunction){
    let code = 400;
    let message: string = ""
    if (error instanceof ZodError) {
        message = error.issues.map(issue => `${issue.path}: ${issue.message}`).join(";")
    } else if(error instanceof ServiceError) {
        code = error.code
        message = error.message
    } else if ((error as any).status){
        code = (error as any).status;
        message = ` ${error.message}`
    } else {
        code = 500
        message = `Inner server error: ${error.message}`
    }
    sendResponse(res, code, message);
}
