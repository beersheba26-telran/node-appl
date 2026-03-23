import z from "zod";

const calcDataSchema = z.object({
    op1: z.coerce.number(),
    op2: z.coerce.number(),
    operation: z.string()
})
export default calcDataSchema