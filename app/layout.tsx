import { Navbar } from "./components/navbar";
import "./app.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "bg-background text-foreground min-h-screen flex flex-col")}
      >
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 md:pt-12">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
