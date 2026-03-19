
import { Readable, ReadableOptions } from "node:stream";
export default class RandomNumbersStream extends Readable {
    private _counter: number = 0
    constructor(private _amount: number, private _min: number, private _max: number,
        private _chunkNumbers: number = 1024 * 1024,
         options: ReadableOptions={}) {
        super(options)
        if (_min > _max) {
            [_min, _max] = [_max, _min]
        }
    }
    override _read(_: number): void {
        if (this._counter >= this._amount) {
            this.push(null)
        } else {
            const chunkNumbers = Math.min(this._amount - this._counter, this._chunkNumbers)
            const buffer: Buffer = this._getChunkBuffer(chunkNumbers);
            this.push(buffer)
            this._counter += chunkNumbers
        }

    }
    private _getChunkBuffer(count: number) : Buffer {
       const array =  new Uint32Array(count)
       for (let i = 0; i < count; i++){
        array[i] = this._min + Math.trunc(Math.random() * (this._max - this._min + 1))
       }
       const resBuffer = Buffer.from(array.buffer)
       return resBuffer
    }
}