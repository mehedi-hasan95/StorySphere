import Logo from "@/components/custom/logo";
import { UserInfo } from "@/components/custom/user-info";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between items-center pt-6 max-w-6xl mx-auto px-6">
        <Logo />
        <UserInfo />
      </div>
      <Separator className="my-6" />
      {children}
    </div>
  );
}
