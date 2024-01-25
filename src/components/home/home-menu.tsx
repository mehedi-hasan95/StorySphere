"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { LoginButton } from "../auth/login-button";
import { UserInfo } from "../custom/user-info";
import { useEffect, useState } from "react";
import Logo from "../custom/logo";
import { Separator } from "../ui/separator";
import { HomeMenuMobile } from "./home-menu-mobile";

export const HomeMenu = () => {
  const currentUser = useCurrentUser();
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`menu ${
        scrolling ? "scrolled bg-yourNewColor" : "bg-transparent"
      } sticky top-0 w-full z-50`}
    >
      <div className="flex justify-between max-w-6xl px-4 mx-auto items-center py-3">
        <Logo />
        <div className="hidden md:flex justify-between items-center gap-x-4">
          <Link href="/about">Our story</Link>
          <Link href="/membership">Membership</Link>
          {currentUser ? (
            <Link href="/write">Write</Link>
          ) : (
            <Link href="/program">Write</Link>
          )}
          {currentUser ? <UserInfo /> : <LoginButton>Sign In</LoginButton>}
        </div>
        <div className="md:hidden">
          <HomeMenuMobile />
        </div>
      </div>
      <Separator className="bg-black" />
    </div>
  );
};
