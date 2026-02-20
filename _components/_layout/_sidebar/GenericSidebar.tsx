"use client"

import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar"
import { SquareTerminal } from "lucide-react"
import { NavMain } from "./NavMain"


const config = {
    header: "Generic Sidebar",
    navMain:[
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
              {
                title: "History",
                url: "#",
              },
              {
                title: "Starred",
                url: "#",
              },
              {
                title: "Settings",
                url: "#",
              },
            ],
          },
    ]
}

export function GenericSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset" className="bg-white text-primary border-r top-16 h-[calc(100vh-4rem)]">
        <SidebarHeader>
            <div className="px-2 py-1.5 text-sm font-semibold truncate">
                {config.header}
            </div>
        </SidebarHeader>
        <SidebarContent>
            
            <NavMain items={config.navMain} />
        </SidebarContent>
    </Sidebar>
  )
}