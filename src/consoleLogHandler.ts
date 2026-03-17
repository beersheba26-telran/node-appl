import LoggerHandler from "./LoggerHandler.js";
import LoggerFormatter from "./LoggerFormatter.js";
export default class ConsoleHandler implements LoggerHandler {
    constructor(private _formatter: LoggerFormatter) {}
    handler(): (message: string) => void {
        return  (message: string) => console.log(this._formatter.format(message))
    }
}