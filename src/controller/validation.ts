import z from "zod";

const calcDataSchema = z.object({
    op1: z.number(),
    op2: z.number(),
    operation: z.string()
})
export default calcDataSchema