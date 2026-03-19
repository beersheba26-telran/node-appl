import { Transform, TransformCallback } from "node:stream";
import logger from "./logger.js";
export default class LimitStream extends Transform {
    private _current: number = 0
    constructor(private _limit: number) {
        super({objectMode: true})
    }
    override _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
       if (this._current >= this._limit) {
        this.push(null)
       } else {
        this._current++;
        this.push(chunk);
         callback()
       }
      
    }
}