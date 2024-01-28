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
import { WritePostAction } from "@/actions/writer-actions/write-post-action";
import { toast } from "sonner";
import { FormError } from "@/components/form/form-error";
const WriteForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof WritePostSchema>>({
    resolver: zodResolver(WritePostSchema),
    defaultValues: {
      title: "",
      image: undefined,
      short_desc: "",
      time: 1,
      content: "",
    },
  });

  //   Editor setup
  const Editor = useMemo(
    () => dynamic(() => import("@/components/custom/editor"), { ssr: false }),
    []
  );

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof WritePostSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      WritePostAction(values).then((data) => {
        setError(data?.error);
        if (data?.success) {
          toast.success(data?.success);
        }
      });
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
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
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Read Time</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Read Time"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Editor {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default WriteForm;
