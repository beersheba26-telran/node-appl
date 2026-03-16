import "dotenv/config"
import os from "node:os"
import logger from "./logger.js"
import fs, { writeFile } from "node:fs"
const content: string = "שלום עולם"
fs.writeFileSync("file.txt", content, {encoding: "utf8"})
const readContent = fs.readFileSync("file.txt", {encoding: "utf8"})
console.log(Array.from(readContent).reverse().join(""))

