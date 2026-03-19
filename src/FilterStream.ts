import { Transform, TransformCallback } from "node:stream";
import logger from "./logger.js";
export default class FilterNumberStream extends Transform {
    constructor(private _pred: (num:number)=>boolean ){
        super({objectMode: true})
    }
    override _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        //Specification: chunk is a number
        if (this._pred(chunk)) {
            this.push(chunk)
        }
        callback()
    }
}