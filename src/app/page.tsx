import { Hero } from "@/components/home/hero";
import { HomeMenu } from "@/components/home/home-menu";

export default function Home() {
  return (
    <main className="w-full">
      <HomeMenu />
      <Hero />
    </main>
  );
}
