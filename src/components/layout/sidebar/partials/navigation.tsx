import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { routes } from "@/lib/routes/routes";
import { FaHome } from "react-icons/fa";
import { LuLayoutDashboard, LuNotebook } from "react-icons/lu";
import Link from "next/link";

export function Navigation() {
  const items = [
    {
      href: routes.home,
      title: "Strona głowna",
      icon: FaHome,
    },
    {
      href: routes.projects.index,
      title: "Projekty",
      icon: LuLayoutDashboard,
    },
    {
      href: routes.userStories.index,
      title: "Historyjki",
      icon: LuNotebook,
    },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Aplikacja</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
