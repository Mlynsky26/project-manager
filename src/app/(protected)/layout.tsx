"use client";

import { UsersProvider } from "@/providers/usersProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UsersProvider>{children}</UsersProvider>;
}
