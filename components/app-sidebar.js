"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  BookOpen,
  Bot,
  Coins,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  GalleryVerticalEnd,
  AudioWaveform,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useWeb3Auth } from "@/context/Web3AuthContext"
import { useWalletClient } from "wagmi"
import { TeamSwitcher } from "./team-switcher"

const data = {
  teams: [
    {
      name: "SBU BBL",
      logo: Coins,
      plan: "Tasks",
    },
    {
      name: "CommPutation",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Some Group",
      logo: Command,
      plan: "Tasks",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: Bot,
    },
    {
      title: "Transactions",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Edit Tasks",
      url: "#",
      icon: Frame,
    },
    {
      name: "Manage Users",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Treasury",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }) {

  const { data: walletClient } = useWalletClient();
  let web3Auth = useWeb3Auth();

  const [user, setUser] = useState({
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      console.log("web3Auth", web3Auth);
      try {
        var userInfo = await web3Auth?.getUserInfo();
      } catch (e) {
        console.log("Cannot get userInfo first time, likely web3Auth not fully updated");
      }
      console.log("/app, userInfo", userInfo);
      if (userInfo) {
        setUser({
          name: userInfo.name,
          email: userInfo.email,
          avatar: userInfo.profileImage,
        });
      }
    };
    getUserInfo();
  }, [walletClient]);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        {/* <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <Coins className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SBU BBL</span>
                  <span className="truncate text-xs">Tasks</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu> */}
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
