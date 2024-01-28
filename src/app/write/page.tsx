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
  return (
    <div>
      {verifiedWriter ? (
        <WriteForm />
      ) : (
        <FormError message="You are not verified. Please wait for a while" />
      )}
    </div>
  );
};

export default WritePage;
