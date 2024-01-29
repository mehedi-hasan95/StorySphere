import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Calendar } from "lucide-react";
import { Posts, User } from "@prisma/client";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TrendinPostsProps {
  data: Array<Posts & { user: User }>;
}
export const TrendinPosts = async ({ data }: TrendinPostsProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
      {data?.map((item, i) => (
        <div className="flex" key={item.id}>
          <div className="w-12 text-lg md:text-xl lg:text-2xl font-bold text-slate-200 select-none">{`0${
            i + 1
          }`}</div>
          <Card className={cn("w-full border-none shadow-none")}>
            <CardContent className={cn("p-0")}>
              <div className="flex gap-x-2 items-center">
                <Image
                  src={item?.user?.image || "https://github.com/shadcn.png"}
                  alt=""
                  height={500}
                  width={500}
                  className="h-6 w-6 rounded-full"
                />
                <p className="text-sm font-semibold">{item.user.name}</p>
              </div>
              <Link
                href={`/${item.id}`}
                className="md:text-xl font-bold line-clamp-2 py-2"
              >
                {item.title}
              </Link>
            </CardContent>
            <CardFooter className={cn("p-0")}>
              <div>
                <div className="flex gap-x-1 items-center text-sm">
                  <Calendar className="h-4 w-4" />
                  <p>{format(item.createdAt, "dd MMM")}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
};
