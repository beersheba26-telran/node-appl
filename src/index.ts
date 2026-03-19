import "dotenv/config";
import logger from "./logger.js";
import { createWriteStream } from "node:fs";
import RandomNumbersStream from "./RandomNumbersStream.js";
import FilterNumberStream from "./FilterStream.js";
import LimitStream from "./LimitStream.js";
import OutputStream from "./OutputStream.js";
new RandomNumbersStream(10, 100).pipe(new FilterNumberStream((num => num % 10 ==0)))
.pipe(new LimitStream(20)).pipe(new OutputStream())





