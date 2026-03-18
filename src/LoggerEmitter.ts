import { EventEmitter } from 'node:events';
import LoggerHandler from './LoggerHandler.js';
export type LoggerLevel = "fatal"|"error"|"warn"|"info"|"debug"|"trace"
const DEFAULT_LOGGER_LEVEL = "info"
const logDef: Record<LoggerLevel, number> = {
  fatal: 1,
  error: 2,
  warn: 3,
  info: 4,
  debug: 5,
  trace: 6,
};
export default class LoggerEmitter extends EventEmitter {
    constructor(handlers: LoggerHandler[]=[]) {
        super();
        handlers.forEach(h => this.on("message", h.handler()))
    }
    log(level: LoggerLevel, message: string): void {
        // Apply being taken "level" that should be compered with environment variable LOGGER_LEVEL for emitting
        //env.LOGGER_LEVEL = "trace" emits for any given level
        //env.LOGGER_LEVEL = "debug" emits for any level except "trace"
        //env.LOGGER_LEVEL = "info"  emits for any level except "trace", "debug"
        //env.LOGGER_LEVEL = "warn"  emits only "warn", "error", "fatal"
        //env.LOGGER_LEVEL = "error" emits only "error", "fatal"
        //env.LOGGER_LEVEL = "fatal" emits only "fatal"
        //env.LOGGER_LEVEL is a non-existing level value or missing the "info" should be implied
        let configLevel: string = process.env.LOGGER_LEVEL ?? DEFAULT_LOGGER_LEVEL
        if (!Object.keys(logDef).includes(configLevel)) {
            configLevel = DEFAULT_LOGGER_LEVEL
        }

        logDef[level] <= logDef[configLevel as LoggerLevel] && this.emitMessage( message, level)
    }
    setHandler(handler: LoggerHandler) {
        this.on("message", handler.handler())
    }
    setLevelHandler(level: LoggerLevel, handler: LoggerHandler) {
        this.on(level, handler.handler())
    }
    private emitMessage(message: string, level: LoggerLevel) {
        this.emit("message", message, level);
        this.emit(level, message, level)
    }
}