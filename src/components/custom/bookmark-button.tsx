"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";

export const BookmarkButton = () => {
  return (
    <Button variant={"ghost"} className={cn("p-0 hover:bg-inherit")}>
      <Bookmark className="h-6 w-6" />
    </Button>
  );
};
