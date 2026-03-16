"use client"

import { Sidebar, SidebarHeader } from "@/components/ui/sidebar"
import { NavMain } from "./NavMain"
import type { GenericSidebarConfig } from "@/config/sidebar/types"

export function GenericSidebar({ config }: { config?: GenericSidebarConfig }) {
  if (!config) return null
  return (
    <Sidebar collapsible="icon" variant="inset" className="bg-white border-r top-16 h-[calc(100vh-4rem)]">
        <SidebarHeader>
            <div className="px-2 py-1.5 text-sm font-semibold truncate">
                {config.header}
            </div>
        </SidebarHeader>
       
            
        <NavMain items={config.nav} />
       
    </Sidebar>
  )
}