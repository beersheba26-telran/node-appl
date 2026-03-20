import { Transform, TransformCallback } from "node:stream";

export default class DistinctLimitStream extends Transform {
    private _uniqueNumbers: Set<number> = new Set();
    constructor(private _limit: number) {
        super({objectMode: true})
    }
    override _transform(chunk: any, _: BufferEncoding, callback: TransformCallback): void {
        if (this._uniqueNumbers.size == this._limit) {
            this.push(null)
        } else {
            if (!this._uniqueNumbers.has(chunk)) {
                this._uniqueNumbers.add(chunk);
                this.push(chunk)
        } 
            callback()
        }
    }

}