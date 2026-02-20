import { GenericSidebar } from "@/_components/_layout/_sidebar/GenericSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
<SidebarProvider>
  <TooltipProvider>
    <GenericSidebar />
  </TooltipProvider>
  <SidebarInset>
    <div className="fixed top-16 w-full bg-white">
    <div className="flex items-center gap-2 p-4 border-b h-16 flex-shrink-0">
      <SidebarTrigger />
    </div>
    </div>

    
    <div className="mt-16 p-6">
      {children}
    </div>
  </SidebarInset>
</SidebarProvider>
  )
}