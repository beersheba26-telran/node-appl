import "dotenv/config";
import logger from "./logger.js";
import { createWriteStream } from "node:fs";
const writeStream = createWriteStream("large_file", {encoding: "utf8", highWaterMark: 1024 * 1024 * 10})
const nChunks = 1_000_00
const chunkNumbers = 1000
 const numbers: string = getRandomNumbers(chunkNumbers).join(" ");
let i = 0;
function writeNumbers() {
  let canWrite = true;
  
  while (canWrite && i < nChunks) {
    canWrite = writeStream.write(numbers)
    i++;
  }
  if (i < nChunks) {
      writeStream.once("drain",writeNumbers) //waiting for draining internal buffer
  } else {
     writeStream.end()
  }
  
 
}
function getRandomNumbers(chunkNumbers: number): number[] {
  return Array.from ({length: chunkNumbers}, () => Math.trunc(Math.random() * 1000))
}
console.time("write");
writeStream.on("finish", () => {console.timeEnd("write"); })

writeNumbers()



