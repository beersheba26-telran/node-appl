import { ServiceError } from "../errors/ServiceError.js";
import { CalcData } from "../model/CalcData.js";
import logger from "../logger.js";
const operations: Map<string, (op1: number, op2: number) => number> = new Map([
  ["add", (op1: number, op2: number) => op1 + op2],
  ["sub", (op1: number, op2: number) => op1 - op2],
  ["mul", (op1: number, op2: number) => op1 * op2],
  [
    "div",
    (op1: number, op2: number) => {
      if (op2 == 0) throw new ServiceError(400, "op2 cannot be 0");
      return op1 / op2;
    },
  ],
  [
    "percent",
    (part: number, whole: number) => {
      if (whole == 0) throw new ServiceError(400, "Whole cannot be 0");
      return Math.round((part / whole) * 100);
    },
  ],
]);
export default function calculate({ op1, op2, operation }: CalcData): number {
  const opFun = operations.get(operation);
  if (!opFun) {
    const error = `${operation} not implemented`;
    logger.error({ operation }, error);
    throw new ServiceError(404, error);
  }
  const result = opFun(op1, op2);
  logger.debug({ op1, op2, operation, result }, "Calculation completed");
  return result;
}
