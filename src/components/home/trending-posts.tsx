import Image from "next/image";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageCircle, PictureInPicture, Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Posts, User } from "@prisma/client";

interface TrendinPostsProps {
  data: Array<Posts & { user: User }>;
}
export const TrendinPosts = async ({ data }: TrendinPostsProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {data?.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <Image
              src={
                item.image ||
                `https://res.cloudinary.com/dlnboadwx/image/upload/v1706374039/StorySphere/vndkrdk87fnmxme6kevk.jpg`
              }
              alt=""
              height={500}
              width={500}
              className="w-full "
            />
          </CardHeader>
          <CardContent>
            <div className="flex gap-x-2">
              <Image
                src={item?.user?.image || "https://github.com/shadcn.png"}
                alt=""
                height={500}
                width={500}
                className="h-8 w-8 rounded-full"
              />
              <p>{item?.user?.name}</p>
            </div>
            <h2 className="md:text-xl font-bold">{item.title}</h2>
            <p className="line-clamp-2">{item.short_desc}</p>
          </CardContent>
          <CardFooter>
            <div>
              <div className="flex gap-x-2 items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                {item.time} min read{" "}
                <p>{format(item.createdAt, "MMMM dd, yyyy")}</p>
              </div>
              <div className="flex justify-between items-center gap-x-3">
                <div className="flex gap-x-5">
                  <Button size={"sm"} variant={"ghost"}>
                    <ThumbsUp className="h-4 w-4 mr-2" /> 10
                  </Button>
                  <Button size={"sm"} variant={"ghost"}>
                    <MessageCircle className="h-4 w-4 mr-2" /> 10
                  </Button>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
