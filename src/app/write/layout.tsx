import Logo from "@/components/custom/logo";
import { UserInfo } from "@/components/custom/user-info";
import { Separator } from "@/components/ui/separator";

export default function WriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 pt-3">
        <Logo />
        <UserInfo />
      </div>
      <Separator className="my-3" />
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </div>
  );
}
