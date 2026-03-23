import { RequestHandler } from "express";
import calcDataSchema from "../controller/calc-data-schema.js";
import z from "zod"
export default function zod_validate(zodSchema: z.ZodObject, source: "body"|"params"|"query" = "body"): RequestHandler {
    return (req, res, next) => {
        req.body = zodSchema.parse((req as any)[source]);
        next()
    }
}