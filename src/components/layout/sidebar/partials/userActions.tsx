'use client';
import { SidebarGroup } from "@/components/ui/sidebar";
import { routes } from "@/lib/routes/routes";
import { LuCircleUser, LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "@/lib/auth/authClient";
import Spinner from "@/components/shared/elements/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function UserActions() {
  const router = useRouter();
  const { data, isPending } = useSession();
  const user = data?.user;

  const userActions = !user
    ? [
      {
        href: routes.auth.signIn,
        title: "Zaloguj się",
        icon: LuLogIn,
        variant: "slate",
      },
      {
        href: routes.auth.signUp,
        title: "Zarejestruj się",
        icon: LuUserPlus,
        variant: "blue",
      },
    ]
    : [
      {
        href: routes.user.profile,
        title: "Profil",
        icon: LuCircleUser,
        variant: "lime",
      }
    ];

  if (isPending) {
    return <Spinner />;
  }

  return (
    <SidebarGroup className="mt-auto p-4">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-accent cursor-pointer">
              <Avatar className="h-8 w-8">
                {user.image ? (
                  <AvatarImage
                    src={user.image}
                    alt={user.name || "User avatar"}
                  />
                ) : (
                  <AvatarFallback>
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col items-start flex-1">
                <span className="text-sm font-medium">
                  {user.name || "Anonim"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                {user?.image ? (
                  <AvatarImage
                    src={user.image}
                    alt={user.name || "User avatar"}
                  />
                ) : (
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {user?.name || "Anonim"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            {userActions.map((item) => (
              <DropdownMenuItem key={item.title} asChild>
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={async () => {
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      console.log("User signed out successfully");
                      router.push(routes.auth.signIn);
                    },
                  },
                });
              }}
            >
              <LuLogOut />
              <span>Wyloguj</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex flex-col gap-2">
          {userActions.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-sm"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </SidebarGroup>
  );
}
