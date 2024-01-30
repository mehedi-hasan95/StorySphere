"use server";
import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { WritePostSchema } from "@/schema/writer/write-post-schema";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export const DeletePostAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    const currentUserRole = await CurrentUserRole();
    if (!currentUser && currentUserRole !== "WRITER") {
      redirect("/");
    }
    await prismaDb.posts.delete({
      where: {
        id: id,
        userId: currentUser?.id,
      },
    });
    revalidatePath("/");
    return { success: "Post delete successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const UpdatePostAction = async (
  values: z.infer<typeof WritePostSchema>,
  id: string
) => {
  try {
    const currentUser = await CurrentUser();
    const currentUserRole = await CurrentUserRole();
    if (!currentUser && currentUserRole !== "WRITER") {
      redirect("/");
    }
    const data = await prismaDb.posts.update({
      where: {
        id: id,
        userId: currentUser?.id,
      },
      data: {
        ...values,
      },
    });
    revalidatePath("/");
    return { success: "Post Update successfully", data };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
