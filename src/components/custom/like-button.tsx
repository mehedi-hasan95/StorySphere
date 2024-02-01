"use client";

import { ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";
import {
  DeleteLikeButtonAction,
  LikeButtonAction,
} from "@/actions/user-actions/user-activities-action";
import { toast } from "sonner";
import { Like } from "@prisma/client";
import { useCurrentUser } from "@/hooks/use-current-user";

interface LikeButtonProps {
  id: string | undefined;
  like: Like | null;
}
export const LikeButton: React.FC<LikeButtonProps> = ({ id, like }) => {
  const currentUser = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const HandleDelete = (id: string) => {
    startTransition(() => {
      DeleteLikeButtonAction(id).then((data) => {
        data?.success && toast.success(data?.success);
        data?.error && toast.error(data?.error);
      });
    });
  };
  const HandleLike = (id: string) => {
    startTransition(() => {
      LikeButtonAction(id).then((data) => {
        data?.success && toast.success(data?.success);
        data?.error && toast.error(data?.error);
      });
    });
  };
  return (
    <>
      {like?.userId === currentUser?.id ? (
        <Button
          disabled={isPending}
          variant={"ghost"}
          className="p-0 hover:bg-inherit"
          onClick={() => HandleDelete(like?.id as string)}
        >
          <ThumbsUp className="text-blue-800 fill-blue-800 h-6 w-6" />
        </Button>
      ) : (
        <Button
          disabled={isPending}
          variant={"ghost"}
          className="p-0 hover:bg-inherit"
          onClick={() => HandleLike(id as string)}
        >
          <ThumbsUp className="h-6 w-6" />
        </Button>
      )}
    </>
  );
};
