import "dotenv/config";
import logger from "./logger.js";
import { createWriteStream } from "node:fs";
import RandomNumbersStream from "./RandomNumbersStream.js";
import FilterNumberStream from "./FilterStream.js";
import LimitStream from "./LimitStream.js";
import OutputStream from "./OutputStream.js";
import { pipeline } from "node:stream/promises";
async function displayStreamedNumbers(min: number, max: number, amount: number,
     pred: (num: number) => boolean): Promise<void> {
    await pipeline(
        new RandomNumbersStream(min, max),
        new FilterNumberStream(pred),
        new LimitStream(amount),
        new OutputStream(" ")
    )
}
displayStreamedNumbers(10, 100, 15, num => num % 2 != 0).then(()=> console.log("Bye"))





