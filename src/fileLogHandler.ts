import { appendFileSync } from "node:fs"
import LoggerHandler, { HandlerFunction } from "./LoggerHandler.js"
import LoggerFormatter from "./LoggerFormatter.js"
import { LoggerLevel } from "./LoggerEmitter.js"
export default class FileHandler implements LoggerHandler {
    constructor(private _filePath: string, private _formatter: LoggerFormatter) {}
    handler(): HandlerFunction {
        return (message: string, level?: LoggerLevel) => appendFileSync(this._filePath, "\n" + this._formatter.format(message, level), {encoding: "utf-8"})
    }
}