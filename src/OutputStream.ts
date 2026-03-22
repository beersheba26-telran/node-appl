import { Writable } from "node:stream";
import logger from "./logger.js";
import { WriteStream } from "node:fs";
export default class OutputStream extends Writable {
    constructor(private _delim: string = "; ", private _writeStream: any = process.stdout) {
        super({objectMode: true})
    }
    override _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        this._writeStream.write(chunk + this._delim)
        callback()
    }
    override _final(callback: (error?: Error | null) => void): void {
        this._writeStream.write("\n")
        callback()
    }
}