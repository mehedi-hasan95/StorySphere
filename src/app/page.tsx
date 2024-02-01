import { Hero } from "@/components/home/hero";
import { HomeMenu } from "@/components/home/home-menu";
import { AllPosts } from "@/components/home/all-posts";
import { TrendinPosts } from "@/components/home/trending-posts";
import { Separator } from "@/components/ui/separator";
import { prismaDb } from "@/lib/prismaDb";
import { TrendingUp } from "lucide-react";

export default async function Home() {
  // Calculate date range for previous three days
  const currentDate = new Date();
  const expectedData = new Date(currentDate);
  expectedData.setDate(currentDate.getDate() - 365);
  const data = await prismaDb.posts.findMany({
    where: {
      createdAt: {
        gte: expectedData,
      },
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  // fetch all data
  const allPosts = await prismaDb.posts.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="pb-10">
      <HomeMenu />
      <Hero />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex gap-x-3 py-5">
          <TrendingUp />
          <p className="font-bold">Trending on Medium</p>
        </div>
        <TrendinPosts data={data} />
      </div>
      <Separator className="my-5" />
      <div>
        <AllPosts data={allPosts} />
      </div>
    </main>
  );
}
