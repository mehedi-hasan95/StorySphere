"use client";
import useSWR from "swr";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface WishListButtonProps {
  data: {
    id: string;
    _count: {
      wishlist: number;
    };
  };
}

const BookmarkButton: React.FC<WishListButtonProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const currentUser = useSession();
  const { data: isFevorite, mutate } = useSWR(
    `${process.env.NEXT_API_URL}/public/bookmark/${data.id}`
  );
  const handleWishlist = async () => {
    if (!currentUser?.data?.user?.id) {
      toast.error("Please login first");
    }
    if (isFevorite?.bookmark?.productId) {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/public/bookmark/${isFevorite.bookmark.id}`,
          {
            method: "DELETE",
          }
        );
        mutate();
        const result = await response.json();
        if (result.msg === "success") {
          toast.success("Removed from the Bookmark");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await fetch(`/api/public/bookmark/${data.id}`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: data.id }),
        });
        mutate();
        const result = await response.json();
        if (result.msg === "success") {
          toast.success("Added to Bookmark");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Button disabled={loading} variant={"ghost"} onClick={handleWishlist}>
        <Bookmark
          size={20}
          className={cn(
            `${
              isFevorite?.bookmark?.id &&
              isFevorite?.bookmark?.userId === currentUser?.data?.user?.id
                ? "text-blue-500 fill-blue-500"
                : ""
            } mr-2 disabled:cursor-none`
          )}
        />
        {data?._count?.wishlist}
      </Button>
    </div>
  );
};

export default BookmarkButton;
