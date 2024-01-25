"use server";

import { CurrentUser, CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { WriterInfoSchema } from "@/schema/writer/writer-info-schema";
import { redirect } from "next/navigation";
import * as z from "zod";

export const CreateWriterAcion = async (
  values: z.infer<typeof WriterInfoSchema>
) => {
  try {
    const currentUser = await CurrentUser();
    const currentUserRole = await CurrentUserRole();
    if (!currentUser && currentUserRole !== "WRITER") {
      redirect("/");
    }
    const validateForm = WriterInfoSchema.safeParse(values);
    if (!validateForm.success) {
      return { error: "Something went wrong" };
    }
    const { authorityIn, bio, education, fb, x } = validateForm.data;
    const data = {
      authorityIn,
      bio,
      education,
      fb,
      x,
      userId: currentUser?.id,
    };
    await prismaDb.writer.create({
      data: data,
    });
    return { success: "Teacher Update Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const UpdateWriterAction = async (
  values: z.infer<typeof WriterInfoSchema>,
  id: string
) => {
  try {
    const currentUser = await CurrentUser();
    const currentUserRole = await CurrentUserRole();
    if (!currentUser && currentUserRole !== "WRITER") {
      redirect("/");
    }
    await prismaDb.writer.update({
      where: {
        id,
        userId: currentUser?.id,
      },
      data: {
        ...values,
      },
    });
    return { success: "Bio update successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
