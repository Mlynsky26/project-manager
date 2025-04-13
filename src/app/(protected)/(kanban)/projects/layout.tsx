"use client";

import { ProjectsStoreProvider } from "@/providers/projectsProvider";

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProjectsStoreProvider>{children}</ProjectsStoreProvider>;
}
