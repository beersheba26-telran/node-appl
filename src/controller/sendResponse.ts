import {Response} from "express"
export default function sendResponse(res: Response, code: number, message: string | object): void {
   res.statusCode = code;
   if (typeof message == "string") {
    res.end(message)
   } else {
    res.json(message)
   }
}