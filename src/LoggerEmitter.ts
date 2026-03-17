import { EventEmitter } from 'node:events';
import LoggerHandler from './LoggerHandler.js';
type LoggerLevel = "fatal"|"error"|"warn"|"info"|"debug"|"trace"
export default class LoggerEmitter extends EventEmitter {
    constructor(handlers: LoggerHandler[]=[]) {
        super();
        handlers.forEach(h => this.on("message", h.handler()))
    }
    log(level: LoggerLevel, message: string): void {
        //TODO Apply being taken "level" that should be compered with environment variable LOGGER_LEVEL for emitting
        //env.LOGGER_LEVEL = "trace" emits for any given level
        //env.LOGGER_LEVEL = "debug" emits for any level except "trace"
        //env.LOGGER_LEVEL = "info"  emits for any level except "trace", "debug"
        //env.LOGGER_LEVEL = "warn"  emits only "warn", "error", "fatal"
        //env.LOGGER_LEVEL = "error" emits only "error", "fatal"
        //env.LOGGER_LEVEL = "fatal" emits only "fatal"
        //env.LOGGER_LEVEL is a non-existing level value or missing the "info" should be implied
        this.emit("message", message)
    }
    setHandler(handler: (message:string) => void) {
        this.on("message", handler)
    }
}