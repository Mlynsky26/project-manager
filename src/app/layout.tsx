import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { AppSidebar } from "@/components/layout/sidebar/appSidebar";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ManageMe",
  description: "Created by Mateusz Moniowski",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={geistSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <SidebarProvider>
              <AppSidebar />
              <main className="p-4 w-full">{children}</main>
            </SidebarProvider>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
