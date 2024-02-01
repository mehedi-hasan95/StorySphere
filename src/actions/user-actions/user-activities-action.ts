"use server";
import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { CommentSchema } from "@/schema/user/user-activities-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const WriteCommentAction = async (
  values: z.infer<typeof CommentSchema>
) => {
  try {
    const currentUser = await CurrentUser();
    if (!currentUser) {
      return { error: "Please login to write a comment" };
    }
    const validField = CommentSchema.safeParse(values);
    if (!validField.success) {
      return { error: "Something went wrong" };
    }
    const { comment, postId } = validField.data;
    const data = { comment, postId, userId: currentUser.id };
    await prismaDb.comment.create({
      data: data,
    });
    revalidatePath("");
    return { success: "Comment posted" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteCommentAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    if (!currentUser) {
      return { error: "Please login to write a comment" };
    }
    await prismaDb.comment.delete({
      where: {
        id: id,
        userId: currentUser.id,
      },
    });
    revalidatePath("");
    return { success: "Post delete successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const LikeButtonAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    if (!currentUser) {
      return { error: "Please login to write a comment" };
    }
    await prismaDb.like.create({
      data: {
        postId: id,
        userId: currentUser.id,
      },
    });
    revalidatePath("");
    return { success: "Post Liked" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteLikeButtonAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    if (!currentUser) {
      return { error: "Please login to write a comment" };
    }
    await prismaDb.like.delete({
      where: {
        id,
        userId: currentUser.id,
      },
    });
    revalidatePath("");
    return { success: "Delete from like" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
