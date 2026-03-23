import express, { Request, Response } from "express";
import pinoHttp from "pino-http";
import zod_validate from "../middleware/validation.js";
import calcDataSchema from "./calc-data-schema.js";
import errorsHandler from "../errors/errorsHadler.js";
import calculate from "../service/calculate.js";
import sendResponse from "./sendResponse.js";
import logger from "../logger.js";
const app = express();
app.use(
  pinoHttp.default({
    logger,
    level: "debug",
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  }),
);
app.use(express.json());
app.patch("/calculate", zod_validate(calcDataSchema), (req, res) => {
  processCalculateRequest(req, res);
});
app.get(
  "/calculate/:operation/:op1/:op2",
  zod_validate(calcDataSchema, "params"),
  (req, res) => {
    processCalculateRequest(req, res);
  },
);
app.get("/calculate", zod_validate(calcDataSchema, "query"), (req, res) => {
  processCalculateRequest(req, res);
});

app.use(errorsHandler);
export default app;

function processCalculateRequest(req: Request, res: Response) {
  const result = calculate(req.body);
  sendResponse(res, 200, { ...req.body, result });
}
