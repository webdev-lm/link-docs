import { GenericSidebar } from "@/_components/_layout/_sidebar/GenericSidebar";
import type { GenericSidebarConfig } from "@/config/sidebar/types";
import regulatoryConfig from "@/config/sidebar/regulatory-guidelines.json";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DynamicBreadcrumb } from "@/app/(frontend)/_layout/DynamicBreadcrumb";
import FooterRegulation from "../_layout/FooterRegulation";

const config: GenericSidebarConfig = regulatoryConfig as GenericSidebarConfig;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
<SidebarProvider>
  <TooltipProvider>
    <GenericSidebar config={config} />
  </TooltipProvider>
  <SidebarInset>
    <div className="fixed top-16 w-full bg-white">
    <div className="flex items-center gap-2 p-4 border-b h-16 flex-shrink-0">
      <SidebarTrigger />
      <DynamicBreadcrumb />
    </div>
    </div>

    
    <div className="mt-16 p-6">
      {children}
    </div>
    <FooterRegulation />
  </SidebarInset>
</SidebarProvider>
  )
}