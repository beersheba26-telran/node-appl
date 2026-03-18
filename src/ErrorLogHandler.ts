import { readFileSync, existsSync } from "node:fs";
import FileHandler from "./fileLogHandler.js";
import { LoggerLevel } from "./LoggerEmitter.js";
import { HandlerFunction } from "./LoggerHandler.js";
import TimeFormatter from "./TimeFormatter.js";

 class ErrorLogHandler extends FileHandler {
    errorMessages: string[] = []
    constructor(filePath: string) {
        super(filePath, new TimeFormatter())
        const contentErrors = existsSync(filePath) && readFileSync(filePath, {encoding: "utf-8"})
        this.errorMessages = contentErrors && contentErrors.split("\n") || []
    }
    override handler(): HandlerFunction {
        return (message: string) => {
            super.handler()(message, "error");
            this.errorMessages.push(message)
        }
    }
    getErrors(pred?: (e: string) => boolean): string[] {
        return this.errorMessages.filter(pred ||( e => !!e))
    }
    
 }
 const errorHandler: ErrorLogHandler = new ErrorLogHandler("error-logs.txt")
 export default errorHandler;