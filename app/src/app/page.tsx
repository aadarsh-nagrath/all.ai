"use client";
import dynamic from "next/dynamic";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

// Dynamically import BrowserRouter to avoid SSR issues
const DynamicBrowserRouter = dynamic(
  () => import("react-router-dom").then((mod) => mod.BrowserRouter),
  { ssr: false }
);

const DynamicRoutes = dynamic(
  () => import("./routes").then((mod) => mod.RoutesComponent),
  { ssr: false }
);

export default function Home() {
  return (
    <DynamicBrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
          </header>
          <DynamicRoutes />
        </SidebarInset>
      </SidebarProvider>
    </DynamicBrowserRouter>
  );
}