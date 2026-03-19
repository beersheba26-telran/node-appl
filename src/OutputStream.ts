import { Writable } from "node:stream";
import logger from "./logger.js";
export default class OutputStream extends Writable {
    constructor(private _delim: string = "; ") {
        super({objectMode: true})
    }
    override _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        process.stdout.write(chunk + this._delim)
        callback()
    }
    override _final(callback: (error?: Error | null) => void): void {
        process.stdout.write("\n")
        this.end()
    }
}