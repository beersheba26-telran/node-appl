import { Readable, ReadableOptions } from "node:stream";
export default class RandomNumbersStream extends Readable {
  constructor(
    private _min: number,
    private _max: number,
  ) {
    super({objectMode: true});
    if (_min > _max) {
      [_min, _max] = [_max, _min];
    }
  }
  override _read(_: number): void {
    this.push(
      this._min + Math.trunc(Math.random() * (this._max - this._min + 1)) ,
    );
  }
}
