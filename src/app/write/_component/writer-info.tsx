"use client";

import { WriterInfoSchema } from "@/schema/writer/writer-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import {
  CreateWriterAcion,
  UpdateWriterAction,
} from "@/actions/writer-actions/update-writer-action";
import { FormError } from "../../../components/form/form-error";
import { FormSuccess } from "../../../components/form/form-success";
import { Writer } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface SettingsProps {
  initialData: Writer | null;
}
export const WriterInfo = ({ initialData }: SettingsProps) => {
  const id = initialData?.id;
  const title = initialData ? "Update about you" : "Write about you";
  const action = initialData ? "Update Bio" : "Create Bio";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof WriterInfoSchema>>({
    resolver: zodResolver(WriterInfoSchema),
    defaultValues: {
      bio: initialData?.bio || "",
      education: initialData?.education || "",
      authorityIn: initialData?.authorityIn || "",
      fb: initialData?.fb || undefined,
      x: initialData?.x || undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof WriterInfoSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      {
        initialData
          ? UpdateWriterAction(values, id as string).then((data) => {
              setError(data.error);
              setSuccess(data.success);
              if (data.success) {
                router.refresh();
              }
            })
          : CreateWriterAcion(values).then((data) => {
              setError(data.error);
              setSuccess(data.success);
              if (data.success) {
                router.refresh();
              }
            });
      }
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              disabled={isPending}
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Input placeholder="Your College" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="authorityIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Expertness</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="fb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Facebook Id</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="fb.com/you" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="x"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your X(twiter) Id</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="x.com/you" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            {isPending ? (
              <Button disabled>
                Please wait
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </Button>
            ) : (
              <Button type="submit">{action}</Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
