import express, { Request, Response } from "express";
import zod_validate from "../middleware/validation.js";
import calcDataSchema from "./calc-data-schema.js";
import errorsHandler from "../errors/errorsHadler.js";
import calculate from "../service/calculate.js";
import sendResponse from "./sendResponse.js";
import logger_middleware from "../middleware/logger-http.js";
const app = express();
app.use(logger_middleware);
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
