import Logo from "@/components/custom/logo";
import { UserInfo } from "@/components/custom/user-info";
import { Separator } from "@/components/ui/separator";
import { prismaDb } from "@/lib/prismaDb";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share, Share2, ThumbsUp } from "lucide-react";
import { EditorRead } from "@/components/custom/editor-read";
import { CommentButton } from "@/components/custom/comment-button";
import { CurrentUser } from "@/lib/current-user";
import { LoginButton } from "@/components/auth/login-button";
import { LikeButton } from "@/components/custom/like-button";
import { Suspense } from "react";
import LoadingPreview from "./loading-preview";
import { ShareButton } from "@/components/custom/share-button";
import NotFound from "@/app/not-found";

const PostId = async ({ params }: { params: { postId: string } }) => {
  const currentUser = await CurrentUser();
  const data = await prismaDb.posts.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      user: true,
      like: true,
      comment: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const like = await prismaDb.like.findFirst({
    where: {
      postId: params.postId,
      userId: currentUser?.id,
    },
  });
  if (!data) {
    return <NotFound />;
  }
  return (
    <div>
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        <Logo />
        <UserInfo />
      </div>
      <Separator />
      <div className="max-w-4xl mx-auto px-6 py-4">
        <h2 className="md:text-xl lg:text-2xl font-bold">{data?.title}</h2>
        <div className="flex items-center gap-3 pt-3">
          <Image
            src={data?.user.image || ""}
            alt=""
            height={500}
            width={500}
            className="h-8 w-8 rounded-full"
          />
          <div>
            <p>{data?.user.name}</p>
            <p>Published date: {format(data?.createdAt as any, "dd MMM")}</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-x-4 items-center">
            {/* Like  */}
            {currentUser ? (
              <p className="flex items-center gap-x-1">
                <LikeButton id={data?.id} like={like} /> {data?.like?.length}
              </p>
            ) : (
              <LoginButton asChild mode="modal">
                <Button className="p-0 hover:bg-inherit" variant={"ghost"}>
                  <ThumbsUp className="h-6 w-6" /> {data?.like?.length}
                </Button>
              </LoginButton>
            )}
            {/* Comment  */}
            {currentUser ? (
              <p>
                <CommentButton id={data?.id} comment={data?.comment as any} />
              </p>
            ) : (
              <LoginButton asChild mode="modal">
                <Button className="p-0 hover:bg-inherit" variant={"ghost"}>
                  <MessageCircle className="h-6 w-6" />
                </Button>
              </LoginButton>
            )}
          </div>
          <div className="flex gap-2">
            <ShareButton id={data?.id} />
          </div>
        </div>
        <Separator />
        <div className="py-5">
          {data?.image && (
            <Image
              src={data.image}
              alt=""
              height={500}
              width={500}
              className="h-full w-full"
            />
          )}
          <div className="pt-3">
            <Suspense fallback={<LoadingPreview />}>
              <EditorRead data={data?.content} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostId;
