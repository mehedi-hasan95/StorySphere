import * as z from "zod";

export const WriterInfoSchema = z.object({
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  education: z.string().min(1, { message: "Your top education lavel" }),
  authorityIn: z.string().min(1, { message: "Your expertness" }),
  fb: z.optional(z.string().min(1, { message: "Your Facebook link" })),
  x: z.optional(z.string().min(1, { message: "Your X link" })),
});
