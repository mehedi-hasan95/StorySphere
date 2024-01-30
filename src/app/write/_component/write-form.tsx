"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMemo, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { WritePostSchema } from "@/schema/writer/write-post-schema";
import { ImageUpload } from "@/components/custom/image-upload";
import {
  UpdatePostAction,
  WritePostAction,
} from "@/actions/writer-actions/write-post-action";
import { FormError } from "@/components/form/form-error";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Posts } from "@prisma/client";

interface WriteFormProps {
  initialData: Posts | null;
}
const WriteForm = ({ initialData }: WriteFormProps) => {
  const action = initialData ? "Update Post" : "Create";
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof WritePostSchema>>({
    resolver: zodResolver(WritePostSchema),
    defaultValues: {
      title: initialData?.title || "",
      image: initialData?.image || undefined,
      short_desc: initialData?.short_desc || "",
      content: initialData?.content || "",
    },
  });

  //   Editor setup
  const Editor = useMemo(
    () => dynamic(() => import("@/components/custom/editor"), { ssr: false }),
    []
  );

  // 2. Define a submit handler.
  // UpdatePostAction
  function onSubmit(values: z.infer<typeof WritePostSchema>) {
    const id = initialData?.id;
    setError("");
    startTransition(() => {
      {
        initialData
          ? UpdatePostAction(values, id as string).then((data) => {
              setError(data?.error);
              if (data?.data) {
                toast.success(data?.success);
                router.push(`/posts/${data?.data?.id}`);
              }
            })
          : WritePostAction(values).then((data) => {
              setError(data?.error);
              if (data?.data) {
                toast.success(data?.success);
                router.push(`/posts/${data?.data?.id}`);
              }
            });
      }
    });
  }

  return (
    <div className="pt-5 pb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            disabled={isPending}
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            control={form.control}
            name="short_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input placeholder="short description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isPending}
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            disabled={isPending}
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Editor {...field} initialContent={initialData?.content} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          {isPending ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit">{action}</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default WriteForm;
