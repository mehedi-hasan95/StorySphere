import * as z from "zod";

export const WritePostSchema = z.object({
  title: z.string().min(2, { message: "Write the title" }),
  image: z.optional(z.string()),
  short_desc: z.string().min(10, { message: "Write short description" }),
  content: z.string(),
  time: z.coerce.number(),
});
