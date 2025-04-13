"use client";
import { routes } from "@/lib/routes/routes";
import { Direction, Specification } from "@/lib/prisma/specification";
import { UserStoriesStoreProvider } from "@/providers/userStoriesProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import UserStory from "@/types/userStory";
import { useSession } from "@/lib/auth/authClient";
import Spinner from "@/components/shared/elements/spinner";

export default function UserStoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, isPending } = useSession();
  const user = data?.user;

  useEffect(() => {
    if (!user?.activeProjectId) {
      toast.error("Wybierz aktywny projekt");
      redirect(routes.projects.index);
    }
  }, [user?.activeProjectId]);

  if (!user?.activeProjectId) return null;

  if (isPending) {
    return <Spinner />;
  }

  const specification: Specification<UserStory> = {
    where: {
      projectId: user.activeProjectId,
    },
    orderBy: {
      createdAt: Direction.DESC,
    },
  };

  return (
    <UserStoriesStoreProvider specification={specification}>
      {children}
    </UserStoriesStoreProvider>
  );
}
