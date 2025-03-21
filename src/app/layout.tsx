import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/globals.css";
import { UserProvider } from "@/context/UserContext";
import { ProjectsProvider } from "@/context/ProjectsContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ManagMe",
  description: "Manage your projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-vh-100`}>
        <UserProvider>
          <ProjectsProvider>
            <div className="d-flex flex-column min-vh-100 gap-3">
              <Header />
              <div className="flex-fill">
                {children}
              </div>
              <Footer />
            </div>
          </ProjectsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
