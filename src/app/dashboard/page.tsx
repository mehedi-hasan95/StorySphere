import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { format } from "date-fns";
import { DashboardForm } from "./_components/dashboard-form";

const DashboardPage = async () => {
  const currentUser = await CurrentUser();
  const data = await prismaDb.posts.findMany({
    where: {
      userId: currentUser?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const writerPost: any = data?.map((item) => ({
    id: item.id,
    title: item.title,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="max-w-6xl mx-auto px-6">
      <DashboardForm data={writerPost} />
    </div>
  );
};

export default DashboardPage;
