"use client";

import { useRouter } from "next/navigation";
import { DashboardProps } from "./dashboard-columns";
import { useTransition } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { DeletePostAction } from "@/actions/writer-actions/write-post-action";
import Link from "next/link";
interface DashboardCellProps {
  data: DashboardProps;
}

export const DashboardCell: React.FC<DashboardCellProps> = ({ data }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${id} is copied`);
  };
  //   Delete Post
  const onDelete = (id: string) => {
    startTransition(() => {
      DeletePostAction(id).then((data) => {
        if (data?.error) {
          toast.error("Something went wrong");
        }
        if (data?.success) {
          toast.success(data?.success);
          router.refresh();
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
        <DropdownMenuItem>
          <Link href={`/posts/${data.id}`} className="flex items-center">
            <Eye className="h-4 w-4 mr-2" /> Read Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" disabled={isPending}>
          <Edit className="h-4 w-4 mr-2" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          disabled={isPending}
          onClick={() => {
            onDelete(data.id);
          }}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
