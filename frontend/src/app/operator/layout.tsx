'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import AppIcon from "@/components/logos/app_icon";
import {
  LayoutDashboard,
  Zap,
  Activity,
  Battery,
  Target,
  Settings,
  Bell,
  Sun,
  Moon,
  ArrowLeft,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const operatorNavItems = [
  {
    title: "Dashboard",
    url: "/operator/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Grid Monitor",
    url: "/operator/monitor",
    icon: Zap,
  },
  {
    title: "AI Decisions",
    url: "/operator/decisions",
    icon: Target,
  },
  {
    title: "Battery Control",
    url: "/operator/battery",
    icon: Battery,
  },
  {
    title: "Alerts",
    url: "/operator/alerts",
    icon: AlertTriangle,
  },
];

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OperatorSidebar>{children}</OperatorSidebar>;
}

function OperatorSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  return (
    <SidebarProvider defaultOpen={true} className="h-screen">
      <Sidebar collapsible="offcanvas" className="border-r border-primary/20">
        <SidebarHeader className="h-16 flex items-center border-b border-primary/20">
          <div className="flex items-center justify-between px-2 w-full">
            <div className="flex items-center gap-3 pt-1.5">
              <AppIcon className="w-10 h-10" />
              <div className="flex flex-col justify-center">
                <span className="font-semibold text-sm">GridMind AI</span>
                <span className="text-xs text-muted-foreground">Operator</span>
              </div>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary font-semibold mb-2">Operator Tools</SidebarGroupLabel>
            <SidebarMenu>
              {operatorNavItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url} className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      isActive 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "hover:bg-sidebar-accent/50"
                    )}>
                      <item.icon className={isActive ? "text-primary" : ""} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="p-3 border-t border-primary/20">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Link
                href="/operator/profile"
                className={`flex-1 flex items-center gap-3 p-2 rounded-lg transition-colors border border-foreground/10 ${
                  pathname === "/operator/profile"
                    ? "bg-primary/50 dark:bg-primary/20 border-primary dark:border-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center font-semibold text-sm shrink-0">
                  OP
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Grid Operator</p>
                  <p className="text-xs text-muted-foreground">Control Center</p>
                </div>
              </Link>
              <Link
                href="/operator/settings"
                className={`w-[50px] flex items-center justify-center rounded-lg transition-colors border border-foreground/10 ${
                  pathname === "/operator/settings"
                    ? "bg-primary/50 dark:bg-primary/20 border-primary dark:border-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
            <Button variant="outline" asChild className="w-full justify-start border border-foreground/10">
              <Link href="/auth">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Switch Role
              </Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className="flex flex-col flex-1 h-full overflow-auto">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-primary/20 px-4 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {pathname === '/operator/profile' ? 'Profile' : pathname === '/operator/settings' ? 'Settings' : operatorNavItems.find(item => item.url === pathname)?.title || "Operator Dashboard"}
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {pathname === '/operator/dashboard' && 'Real-time grid operations and AI decision center'}
              {pathname === '/operator/monitor' && 'Live grid monitoring and sensor data'}
              {pathname === '/operator/decisions' && 'AI-driven operational decisions'}
              {pathname === '/operator/battery' && 'Battery storage management'}
              {pathname === '/operator/alerts' && 'System alerts and notifications'}
              {pathname === '/operator/profile' && 'Manage your personal information'}
              {pathname === '/operator/settings' && 'Configure your preferences'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={18} />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Operator Alerts</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex gap-3 p-3 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Grid Warning</p>
                      <p className="text-xs text-muted-foreground">Voltage fluctuation detected</p>
                      <p className="text-xs text-muted-foreground mt-1">5 min ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg border">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">System Normal</p>
                      <p className="text-xs text-muted-foreground">All systems operating normally</p>
                      <p className="text-xs text-muted-foreground mt-1">1 min ago</p>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
