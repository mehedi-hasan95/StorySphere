"use server";
import { CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";

export const UpdateWriterVerification = async (id: string) => {
  try {
    const userRole = await CurrentUserRole();
    if (!userRole) {
      return { error: "Unauthorize user" };
    }
    await prismaDb.writer.update({
      where: {
        id: id,
      },
      data: {
        isVerified: true,
      },
    });
    return { success: "Update Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteWriterVerification = async (id: string) => {
  try {
    const userRole = await CurrentUserRole();
    if (!userRole) {
      return { error: "Unauthorize user" };
    }
    await prismaDb.writer.delete({
      where: {
        id: id,
      },
    });
    return { success: "Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
