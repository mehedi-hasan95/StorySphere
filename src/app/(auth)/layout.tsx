import Logo from "@/components/custom/logo";
import { Separator } from "@/components/ui/separator";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex justify-between items-center max-w-6xl px-6 mx-auto pt-6">
        <Logo />
      </div>
      <Separator className="my-3" />
      <div className="commonCss">{children}</div>
    </div>
  );
}
