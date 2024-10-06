import { cn } from "@/lib/utils";
import ThemeProvider from "@/providers/theme";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Finance by Paulo Ruan",
  description: "Gestor de Finanças pessoais",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-title",
  preload: true,
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full bg-background dark:bg-background",
          inter.variable,
          poppins.variable,
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
