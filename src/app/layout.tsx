import type { Metadata } from "next";
import { Inter, Merriweather, Overpass_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/provider/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

const overpass_mono = Overpass_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-overpass-momo",
  weight: "400",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
  weight: "400",
});
export const metadata: Metadata = {
  title: "Story Sphere",
  description: "Write your blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html
        lang="en"
        className={`${overpass_mono.variable} ${merriweather.variable}`}
      >
        <body className={cn(inter.className)}>
          <NextTopLoader color="#2299DD" height={3} />
          <EdgeStoreProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              {children}
              <Toaster position="top-center" richColors />
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
