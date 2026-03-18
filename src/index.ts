import "dotenv/config";
import logger from "./logger.js";
<<<<<<< HEAD
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
=======
import { createReadStream, ReadStream } from "node:fs";
let countChunk: number = 0
const kbBytes = 1024 
const stream: ReadStream = createReadStream("large_file", {encoding: "binary", highWaterMark: 1024 * 1024 * 500});
console.time("running time of reading");
(async () => {
  for await (const chunk of stream) {
     countChunk++;
  logger.debug(`chunk with ${chunk.length/kbBytes} Kb`)
  }
  console.timeEnd("running time of reading")
      console.log("count of chunks is ", countChunk)
}) ()


>>>>>>> 7b6e5d4 (ReadStream from large file)




