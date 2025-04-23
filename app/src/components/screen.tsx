"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function Screen({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex w-screen h-screen overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 h-full w-full overflow-hidden">
            <div className="flex items-center gap-2 px-4 ">
              <SidebarTrigger className="ml-1 mt-2" />
              <Separator orientation="vertical" className="mr-2 h-4 mt-2" />
            </div>
          <main className="flex-1 w-full overflow-y-auto p-4">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
