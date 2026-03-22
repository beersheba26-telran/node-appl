import { pipeline } from "stream/promises"
import RandomNumbersStream from "./RandomNumbersStream.js"
import DistinctLimitStream from "./DistinctLimitStream.js"
import OutputStream from "./OutputStream.js"

export default async function displayUniqueNumbers(min: number, max: number, amount: number,
      writeStream: any = process.stdout): Promise<void> {
        if (min > max) {
            [min, max] = [max, min]
        }
        if (amount > max - min + 1) {
            throw Error(`amount (${amount}) cannot be greater than max(${max}) - min(${min}) + 1))`)
        }
   
    const output = new OutputStream(" ", writeStream);
    return new Promise((resolve, reject) => {
        new RandomNumbersStream(min, max).pipe(new DistinctLimitStream(amount))
        .pipe(output);
         output.on("finish",resolve)
        output.on("error", reject)
    })
}