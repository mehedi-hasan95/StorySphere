"use client";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrigin } from "@/hooks/use-origin";
import { toast } from "sonner";

interface ShareButtonProps {
  id: string;
}
export const ShareButton = ({ id }: ShareButtonProps) => {
  const origin = useOrigin();
  const url = `${origin}/posts/${id}`;
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success(`${url} is copied`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Share2 className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Share</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onCopy} className={cn("cursor-pointer")}>
          <Copy className="mr-2 h-4 w-4" /> Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EmailShareButton url={url} className={cn("flex items-center gap-1")}>
            <EmailIcon size={24} /> Email
          </EmailShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FacebookShareButton
            url={url}
            className={cn("flex items-center gap-1")}
          >
            <FacebookIcon size={24} /> Facebook
          </FacebookShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <TwitterShareButton
            url={url}
            className={cn("flex items-center gap-1")}
          >
            <TwitterIcon size={24} />
            Twitter
          </TwitterShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PinterestShareButton
            media=""
            url={url}
            className={cn("flex items-center gap-1")}
          >
            <PinterestIcon size={24} />
            Pinterest
          </PinterestShareButton>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LinkedinShareButton
            url={url}
            className={cn("flex items-center gap-1")}
          >
            <LinkedinIcon size={24} />
            LinkedIn
          </LinkedinShareButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
