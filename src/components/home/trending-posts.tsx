import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageCircle, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TrendinPosts = () => {
  return (
    <div className="max-w-6xl p-6 mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="flex gap-x-3">
          <TrendingUp />
          <p className="font-bold">Trending on Medium</p>
        </div>
        <Card>
          <CardHeader>
            <Image src="" alt="" height={500} width={500} className="w-full " />
          </CardHeader>
          <CardContent>
            <div className="flex gap-x-2">
              <Image
                src=""
                alt=""
                height={500}
                width={500}
                className="h-8 w-8 rounded-full"
              />
              <p>Autho Name</p>
              <p>Company name</p>
            </div>
            <h2 className="md:text-xl font-bold">Title</h2>
            <p className="line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque laudantium qui eaque, facere soluta sit asperiores
              repellat nobis! Doloribus, voluptatum.
            </p>
          </CardContent>
          <CardFooter>
            <div>
              <div className="flex gap-x-2">
                <Star className="h-2 w-2 text-yellow-500 fill-yellow-500" /> .
                10 min read . <p>Date</p>
              </div>
              <div className="flex justify-between items-center gap-x-3">
                <div className="flex gap-x-5">
                  <Image
                    src="/clap.png"
                    alt=""
                    height={500}
                    width={500}
                    className="h-4 w-4"
                  />
                  <Button size={"sm"} variant={"ghost"}>
                    <MessageCircle className="h-2 w-2 mr-2" /> 10
                  </Button>
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
