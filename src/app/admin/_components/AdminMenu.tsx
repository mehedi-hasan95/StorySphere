"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminMenu = () => {
  const menu = [
    { label: "Admin Home", href: "/admin" },
    { label: "Unverified Writer", href: "/admin/unverified" },
    { label: "Writers", href: "/admin/writers" },
    { label: "Users", href: "/admin/users" },
  ];
  const pathName = usePathname();
  return (
    <>
      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "hover:bg-sky-100 px-3 py-2",
            pathName === item.href &&
              "bg-sky-100 text-sky-700 rounded-md font-bold"
          )}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
};
