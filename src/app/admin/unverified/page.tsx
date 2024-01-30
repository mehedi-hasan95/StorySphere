import { prismaDb } from "@/lib/prismaDb";
import { format } from "date-fns";
import { UnverifiedWriterForm } from "./_components/unverified-writer-form";

const UnverifiedWriter = async () => {
  const data = await prismaDb.writer.findMany({
    where: {
      isVerified: {
        equals: false,
      },
    },
    include: {
      user: true,
    },
  });

  const formatedCourse: any = data?.map((item) => ({
    id: item.id,
    name: item.user?.name,
    email: item.user?.email,
    isVerified: item.isVerified,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <UnverifiedWriterForm initialData={formatedCourse} />
    </div>
  );
};

export default UnverifiedWriter;
