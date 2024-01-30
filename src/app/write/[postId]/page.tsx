import { prismaDb } from "@/lib/prismaDb";
import WriteForm from "../_component/write-form";

const WritePage = async ({ params }: { params: { postId: string } }) => {
  const data = await prismaDb.posts.findUnique({
    where: {
      id: params.postId,
    },
  });
  return (
    <div>
      <WriteForm initialData={data} />
    </div>
  );
};

export default WritePage;
