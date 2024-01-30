import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { FormError } from "@/components/form/form-error";
import { WritePostHome } from "./_component/write-post-home";

const WritePage = async () => {
  const currentUser = await CurrentUser();
  const verifiedWriter = await prismaDb.writer.findFirst({
    where: {
      userId: currentUser?.id,
      isVerified: {
        equals: true,
      },
    },
  });
  const unVerifiedWriter = await prismaDb.writer.findFirst({
    where: {
      userId: currentUser?.id,
    },
  });
  return (
    <div>
      {!unVerifiedWriter ? (
        <FormError message="Please update your teacher profile" />
      ) : verifiedWriter ? (
        <WritePostHome />
      ) : (
        <FormError message="You are not verified. Admin will verify soon" />
      )}
    </div>
  );
};

export default WritePage;
