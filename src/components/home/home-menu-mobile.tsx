"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { UserInfo } from "../custom/user-info";
import { LoginButton } from "../auth/login-button";
import { AlignJustify } from "lucide-react";

export const HomeMenuMobile = () => {
  const currentUser = useCurrentUser();
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetDescription>
            <div className="flex flex-col gap-y-4">
              <Link href="/about">Our story</Link>
              <Link href="/membership">Membership</Link>
              {currentUser ? (
                <Link href="/write">Write</Link>
              ) : (
                <Link href="/program">Write</Link>
              )}
              {currentUser ? <UserInfo /> : <LoginButton>Sign In</LoginButton>}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
