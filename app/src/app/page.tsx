"use client";

import dynamic from "next/dynamic";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Workplace from "@/pages/workplace/workplace";

// Dynamic import for pages
const DynamicPage = ({ page }: { page: string }) => {
  const PageComponent = dynamic(() => import(`@/pages/${page}`).catch(() => Workplace), {
    ssr: false,
  });
  return <PageComponent />;
};

export default function Home() {
  const currentPath = typeof window !== "undefined" ? window.location.pathname.replace("/", "") : "";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <DynamicPage page={currentPath || "workplace"} />
      </SidebarInset>
    </SidebarProvider>
  );
}
