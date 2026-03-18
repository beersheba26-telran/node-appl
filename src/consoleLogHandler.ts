import LoggerHandler, { HandlerFunction } from "./LoggerHandler.js";
import LoggerFormatter from "./LoggerFormatter.js";
import { LoggerLevel } from "./LoggerEmitter.js";
export default class ConsoleHandler implements LoggerHandler {
    constructor(private _formatter: LoggerFormatter) {}
    handler(): HandlerFunction {
        return  (message: string, level?: LoggerLevel) => console.log(this._formatter.format(message,
             !!level ? level : undefined))
    }
}