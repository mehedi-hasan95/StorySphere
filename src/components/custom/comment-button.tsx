"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Loader2, MessageCircle } from "lucide-react";
import { CommentSchema } from "@/schema/user/user-activities-schema";
import { useTransition } from "react";
import {
  DeleteCommentAction,
  WriteCommentAction,
} from "@/actions/user-actions/user-activities-action";
import { toast } from "sonner";
import { Comment, User } from "@prisma/client";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CommentButtonProps {
  id: string | undefined;
  comment: Array<Comment & { user: User }>;
}
export const CommentButton = ({ id, comment }: CommentButtonProps) => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      comment: "",
      postId: id,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CommentSchema>) {
    startTransition(() => {
      WriteCommentAction(values).then((data) => {
        if (data.success) {
          toast.success(data?.success);
          form.reset();
        }
        if (data.error) {
          toast.success(data?.error);
        }
      });
    });
  }

  const onDelete = (id: string) => {
    startDeleting(() => {
      DeleteCommentAction(id).then((data) => {
        if (data.success) {
          toast.success(data?.success);
          router.refresh();
        }
        if (data.error) {
          toast.error(data?.error);
        }
      });
    });
  };
  return (
    <Sheet>
      <SheetTrigger className={cn("flex items-center")}>
        <MessageCircle className="mr-1 h-4 w-4" />
        {comment?.length}
      </SheetTrigger>
      <SheetContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Write comment</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Tell us a little what you think"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postId"
              render={({ field }) => (
                <FormItem className="sr-only">
                  <FormLabel>Write comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little what you think"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isPending ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </Form>
        <Separator className="my-4" />
        <div className="flex flex-col gap-y-4">
          {comment.map((item) => (
            <div key={item.id}>
              <div className="flex items-center gap-1">
                <Image
                  src={item.user.image || "https://github.com/shadcn.png"}
                  alt=""
                  height={500}
                  width={500}
                  className="h-6 w-6 rounded-full"
                />
                <p>{item.user.name}</p>
              </div>
              <p className="pt-2">{item.comment}</p>
              <div className="flex justify-between items-center">
                <p>Posted: {format(item.createdAt, "hh:mm a, dd MMM")}</p>
                {item.userId === currentUser?.id && (
                  <Button
                    variant={"ghost"}
                    className="hover:bg-inherit"
                    onClick={() => onDelete(item.id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
