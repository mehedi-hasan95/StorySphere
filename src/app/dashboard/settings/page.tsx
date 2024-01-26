import { Settings } from "@/components/auth/settings";
import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";

const SettingsPage = async () => {
  const currentUser = await CurrentUser();
  const data = await prismaDb.writer.findFirst({
    where: {
      userId: currentUser?.id,
    },
  });
  return (
    <div>
      <Settings initialData={data} />
    </div>
  );
};

export default SettingsPage;
