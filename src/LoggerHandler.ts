import { LoggerLevel } from "./LoggerEmitter.js"

export default interface LoggerHandler {
    handler(): HandlerFunction
}
export type HandlerFunction = (message: string, level?: LoggerLevel) => void