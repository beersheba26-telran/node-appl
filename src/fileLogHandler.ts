import { appendFileSync } from "node:fs"
import LoggerHandler from "./LoggerHandler.js"
import LoggerFormatter from "./LoggerFormatter.js"
export default class FileHandler implements LoggerHandler {
    constructor(private _filePath: string, private _formatter: LoggerFormatter) {}
    handler(): (message: string) => void {
        return (message: string) => appendFileSync(this._filePath, "\n" + this._formatter.format(message), {encoding: "utf-8"})
    }
}