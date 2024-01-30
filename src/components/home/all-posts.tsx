import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Posts, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { BookmarkButton } from "@/components/custom/bookmark-button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { cn } from "@/lib/utils";

interface AllPostsProps {
  data: Array<Posts & { user: User }>;
}
export const AllPosts = ({ data }: AllPostsProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-6xl px-6 mx-auto gap-x-5 gap-y-8">
      {data.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-0">
            <CardTitle>
              <Image
                src={item?.image || "/thumbnail.jpg"}
                alt=""
                height={500}
                width={500}
                className=""
              />
            </CardTitle>
            <CardDescription className={cn("flex gap-x-2 items-center")}>
              <Image
                src={item?.user?.image || "https://github.com/shadcn.png"}
                alt=""
                height={500}
                width={500}
                className="h-8 w-8 rounded-full"
              />
            </CardDescription>
            <CardDescription className={cn("")}>
              {item.user.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/posts/${item.id}`}
              className="md:text-xl font-bold line-clamp-2 py-2"
            >
              {item.title}
            </Link>
            <p className="line-clamp-3">{item.short_desc}</p>
          </CardContent>
          <CardFooter className={cn("flex justify-between items-center")}>
            <p>Published: {format(item.createdAt, "dd MMM")}</p>
            <HoverCard openDelay={0}>
              <HoverCardTrigger>
                <BookmarkButton />
              </HoverCardTrigger>
              <HoverCardContent className="max-w-max py-2">
                Save
              </HoverCardContent>
            </HoverCard>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
