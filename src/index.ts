import "dotenv/config";
import logger from "./logger.js";
import LoggerEmitter from "./LoggerEmitter.js";
import ConsoleHandler from "./consoleLogHandler.js";
import FileHandler from "./fileLogHandler.js";
import TimeFormatter from "./TimeFormatter.js";
import errorHandler from "./ErrorLogHandler.js";
const formatter =  new TimeFormatter("EST");
const loggerEmitter = new LoggerEmitter([new ConsoleHandler(formatter), new FileHandler("logs.txt", formatter)]);
const messages: string[] = ["Hello world", "What's up", "How are you", "Bye"]
loggerEmitter.setLevelHandler("error", errorHandler)
messages.forEach(m => loggerEmitter.log("info",m))
loggerEmitter.log("error", "some error 3")
const errors: string[] = errorHandler.getErrors(e => parseInt(e.substring(e.indexOf(":") + 1)) > 40);
logger.info(errors.length == 0 ? "No errors" : errors)




