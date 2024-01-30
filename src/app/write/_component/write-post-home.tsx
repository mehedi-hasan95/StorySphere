import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { format } from "date-fns";
import { DashboardForm } from "./dashboard-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
export const WritePostHome = async () => {
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
      <div className="flex justify-between items-center gap-x-3">
        <h2 className="md:text-lg lg:text-2xl font-bold">
          Total posts: {data?.length}
        </h2>
        <Button>
          <Link href="/write/new" className="flex">
            <Pencil className="h-4 w-4 mr-2" /> Write
          </Link>
        </Button>
      </div>
      <Separator className="my-3" />
      <DashboardForm data={writerPost} />
    </div>
  );
};
