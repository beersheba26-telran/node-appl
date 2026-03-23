import z from "zod";
import calcDataSchema from "../controller/calc-data-schema.js";

export type CalcData = z.infer<typeof calcDataSchema>