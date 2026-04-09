"use client";

import { Menu } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import AppIcon from "../../logos/app_icon";
import { Button, type ButtonProps } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/providers";
import { Moon, Sun } from "lucide-react";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  className?: string;
}

export default function Navbar({
  logo = <AppIcon size={28} />,
  name = siteConfig.name,
  homeUrl = "/",
  mobileLinks = [
    { text: "App", href: "/app/dashboard" },
    { text: "Features", href: "#features" },
    { text: "About", href: "#about" },
  ],
  actions = [
    {
      text: "Go to App",
      href: "/app/dashboard",
      isButton: true,
      variant: "default",
    },
  ],
  className,
}: NavbarProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className={cn("fixed top-0 left-0 w-full z-50", className)}>
      <div className="max-w-container mx-auto flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4">
        <NavbarComponent className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8">
          <NavbarLeft>
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-lg sm:text-xl font-bold"
            >
              {logo}
              <span className="hidden sm:inline">{name}</span>
            </a>
          </NavbarLeft>
          
          <NavbarRight className="hidden md:flex items-center gap-4">
            {actions.map((action, index) =>
              action.isButton ? (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  asChild
                >
                  <a href={action.href}>
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </a>
                </Button>
              ) : (
                <a
                  key={index}
                  href={action.href}
                  className="text-sm font-medium hover:text-primary"
                >
                  {action.text}
                </a>
              ),
            )}
            
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
          </NavbarRight>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-[320px] sm:max-w-[360px]">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <nav className="grid gap-4 sm:gap-6 text-base sm:text-lg font-medium">
                <a
                  href={homeUrl}
                  className="flex items-center gap-2 text-xl font-bold pb-4"
                >
                  <AppIcon size={24} />
                  <span>{name}</span>
                </a>
                {mobileLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
                <div className="flex flex-col gap-3">
                  {actions.map((action, index) =>
                    action.isButton ? (
                      <Button
                        key={index}
                        variant={action.variant || "default"}
                        className="w-full justify-center"
                        asChild
                      >
                        <a href={action.href}>
                          {action.icon}
                          {action.text}
                          {action.iconRight}
                        </a>
                      </Button>
                    ) : (
                      <a
                        key={index}
                        href={action.href}
                        className="text-muted-foreground hover:text-foreground transition-colors py-2"
                      >
                        {action.text}
                      </a>
                    )
                  )}
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Theme</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setTheme("light")} className="flex-1">
                      <Sun className="w-4 h-4 mr-2" />
                      Light
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setTheme("dark")} className="flex-1">
                      <Moon className="w-4 h-4 mr-2" />
                      Dark
                    </Button>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </NavbarComponent>
      </div>
    </header>
  );
}