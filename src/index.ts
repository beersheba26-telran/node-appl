import "dotenv/config";
import logger from "./logger.js";
import LoggerEmitter from "./LoggerEmitter.js";
import ConsoleHandler from "./consoleLogHandler.js";
import FileHandler from "./fileLogHandler.js";
import TimeFormatter from "./TimeFormatter.js";
const formatter =  new TimeFormatter("EST");
const loggerEmitter = new LoggerEmitter([new ConsoleHandler(formatter), new FileHandler("logs.txt", formatter)]);
const messages: string[] = ["Hello world", "What's up", "How are you", "Bye"]
messages.forEach(m => loggerEmitter.log("trace",m))



