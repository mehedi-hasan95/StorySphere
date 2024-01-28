import { CurrentUser } from "@/lib/current-user";
import WriteForm from "./_component/write-form";
import { prismaDb } from "@/lib/prismaDb";
import { FormError } from "@/components/form/form-error";

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
        <WriteForm />
      ) : (
        <FormError message="You are not verified. Admin will verify soon" />
      )}
    </div>
  );
};

export default WritePage;
