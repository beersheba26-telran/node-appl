import z from "zod"
import calcDataSchema from "../controller/validation.js"
export type CalcData = z.infer<typeof calcDataSchema>