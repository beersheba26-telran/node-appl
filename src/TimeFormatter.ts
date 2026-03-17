import LoggerFormatter from "./LoggerFormatter.js";

export default class TimeFormatter implements LoggerFormatter {
  constructor(private _timeZone?: string) {}
  format(message: string): string {
    let running = true;
    let time: Intl.DateTimeFormat;
    while (running) {
      try {
          time = Intl.DateTimeFormat(undefined, {
          timeZone: this._timeZone || process.env.TZ,
          dateStyle: "short",
          timeStyle: "medium",
          hour12: false,
        });
        running=false;
      } catch (error) {
         this._timeZone = undefined
      }
    }
    return `${time!.format(new Date())} ${message}`;
  }
}
