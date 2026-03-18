import { LoggerLevel } from "./LoggerEmitter.js";

export default interface LoggerFormatter {
    format(message: string, level?: LoggerLevel): string
}