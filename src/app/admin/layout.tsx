import Logo from "@/components/custom/logo";
import { UserInfo } from "@/components/custom/user-info";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { AdminMenu } from "./_components/AdminMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="max-w-6xl px-6 mx-auto flex justify-between items-center py-3 gap-5">
        <Logo />
        <UserInfo />
      </div>
      <Separator />
      <div className="md:flex max-w-6xl px-6 mx-auto py-5 gap-5">
        <div className="md:w-1/3 flex flex-col gap-2">
          <AdminMenu />
        </div>
        <div className="md:w-2/3">{children}</div>
      </div>
    </div>
  );
}
