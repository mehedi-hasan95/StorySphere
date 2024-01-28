"use server";
import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { WritePostSchema } from "@/schema/writer/write-post-schema";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const WritePostAction = async (
  values: z.infer<typeof WritePostSchema>
) => {
  try {
    const currentUser = await CurrentUser();
    const verifiedUser = await prismaDb.writer.findFirst({
      where: {
        userId: currentUser?.id,
        isVerified: {
          equals: false,
        },
      },
    });
    if (verifiedUser) {
      return { error: "Write is not verified" };
    }

    const validateField = WritePostSchema.safeParse(values);
    if (!validateField.success) {
      return { error: "Something went wrong" };
    }
    const { content, short_desc, title, image } = validateField.data;
    const info = {
      content,
      short_desc,
      title,
      image,
      userId: currentUser?.id as string,
    };
    const data = await prismaDb.posts.create({
      data: info,
    });
    revalidatePath("/");
    return { success: "Post Created Successfully", data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
