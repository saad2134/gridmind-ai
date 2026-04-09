"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import AppIcon from "@/components/logos/app_icon";
import {
  LayoutDashboard,
  Zap,
  BarChart3,
  Battery,
  Settings,
  Bell,
  Sun,
  Moon,
  Target,
  TrendingUp,
  ArrowLeft,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
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
import { siteConfig } from "@/config/site";

const appNavItems = [
  {
    title: "Dashboard",
    url: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    url: "/app/analytics",
    icon: BarChart3,
  },
  {
    title: "Energy Monitor",
    url: "/app/monitor",
    icon: Zap,
  },
  {
    title: "Demand Forecast",
    url: "/app/demand",
    icon: TrendingUp,
  },
  {
    title: "Renewable Sources",
    url: "/app/renewable",
    icon: Battery,
  },
  {
    title: "AI Decisions",
    url: "/app/decisions",
    icon: Target,
  },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppSidebar>{children}</AppSidebar>;
}

function AppSidebar({ children }: { children: React.ReactNode }) {
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
                <span className="text-xs text-muted-foreground">{siteConfig.version}</span>
              </div>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {appNavItems.map((item) => {
                if (item.items) {
                  return (
                    <div key={item.title}>
                      <SidebarGroupLabel className="text-primary font-semibold">{item.title}</SidebarGroupLabel>
                      {item.items.map((subItem) => {
                        const isActive = pathname === subItem.url;
                        return (
                          <SidebarMenuItem key={subItem.title}>
                            <Link href={subItem.url} className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                              isActive 
                                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                                : "hover:bg-sidebar-accent/50"
                            )}>
                              <subItem.icon className={isActive ? "text-primary" : ""} />
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuItem>
                        );
                      })}
                    </div>
                  );
                }
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
                href="/app/profile"
                className={`flex-1 flex items-center gap-3 p-2 rounded-lg transition-colors border border-foreground/10 ${
                  pathname === "/app/profile"
                    ? "bg-primary/50 dark:bg-primary/20 border-primary dark:border-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-primary/50 dark:bg-primary/50 flex items-center justify-center font-semibold text-sm shrink-0">
                  GA
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Grid Admin</p>
                  <p className="text-xs text-muted-foreground">Operator</p>
                </div>
              </Link>
              <Link
                href="/app/settings"
                className={`w-[50px] flex items-center justify-center rounded-lg transition-colors border border-foreground/10 ${
                  pathname === "/app/settings"
                    ? "bg-primary/50 dark:bg-primary/20 border-primary dark:border-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
              </Link>
            </div>
            <Button variant="outline" asChild className="w-full justify-start border border-foreground/10">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go to Home
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
              {appNavItems.find(item => item.url === pathname)?.title || 
                appNavItems.find(item => item.items?.some(subItem => subItem.url === pathname))?.title ||
                appNavItems.flatMap(item => item.items || []).find(subItem => subItem.url === pathname)?.title || 
                "GridMind"}
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              {pathname === '/app/dashboard' && 'Real-time energy monitoring and AI decision intelligence'}
              {pathname === '/app/analytics' && 'Analyze energy patterns and trends'}
              {pathname === '/app/monitor' && 'Monitor energy sources and demand'}
              {pathname === '/app/demand' && 'Forecast energy demand'}
              {pathname === '/app/renewable' && 'Track renewable energy sources'}
              {pathname === '/app/decisions' && 'View AI-driven decisions'}
              {pathname === '/app/profile' && 'Manage your profile'}
              {pathname === '/app/settings' && 'Configure system settings'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Notifications</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-3 p-3 rounded-lg border">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">High Demand Alert</p>
                      <p className="text-xs text-muted-foreground">Demand spike predicted at 6 PM</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg border">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Battery className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Battery Optimal</p>
                      <p className="text-xs text-muted-foreground">Storage at 85% capacity</p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
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