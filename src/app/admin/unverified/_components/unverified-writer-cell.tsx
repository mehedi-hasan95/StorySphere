"use client";

import { Button } from "@/components/ui/button";
import { UnverifiedWriterColumns } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import {
  DeleteWriterVerification,
  UpdateWriterVerification,
} from "@/actions/admin-actions/writer-related-actions";
import { useRouter } from "next/navigation";

interface UnverifiedWriterCellProps {
  data: UnverifiedWriterColumns;
}
export const UnverifiedWriterCell: React.FC<UnverifiedWriterCellProps> = ({
  data,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${id} is copied`);
  };
  const onUpdate = async (id: string) => {
    startTransition(() => {
      UpdateWriterVerification(id).then((data) => {
        if (data.success) {
          toast.success("Writer update successrully");
          router.refresh();
        } else {
          toast.error("Something went wrong");
        }
      });
    });
  };
  const onDelete = async (id: string) => {
    startTransition(() => {
      DeleteWriterVerification(id).then((data) => {
        if (data.success) {
          toast.success("Writer Delete successrully");
          router.refresh();
        } else {
          toast.error("Something went wrong");
        }
      });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant={"ghost"}>
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onCopy(data.id)}
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy Id
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onUpdate(data.id)}
          disabled={isPending}
        >
          <Edit className="h-4 w-4 mr-2" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onDelete(data.id)}
          disabled={isPending}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
