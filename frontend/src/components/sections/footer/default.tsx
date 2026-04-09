"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CORE_CONFIG, siteConfig } from "@/config/site";
import { useTheme } from "@/components/providers";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  className?: string;
}

const SocialIcons = {
  Github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
};

export default function FooterSection({
  name = siteConfig.name,
  columns = [
    {
      title: "Product",
      links: [
        { text: "Dashboard", href: "/auth" },
        { text: "Features", href: "#features" },
        { text: "Documentation", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "API Reference", href: "#" },
        { text: "Support", href: "#" },
        { text: "Status", href: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Privacy Policy", href: "#" },
        { text: "Terms of Service", href: "/terms" },
        { text: "Cookie Policy", href: "#" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear() || 2025} ${name} ${siteConfig.version}. All rights reserved.`,
  className,
}: FooterProps) {
  const { setTheme } = useTheme();

  return (
    <footer className={cn("relative w-full px-8 pt-14", className)}>
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "mx-auto mb-8 w-full max-w-7xl rounded-2xl p-6 shadow-xl backdrop-blur-md border border-foreground/20 dark:border-border/50 bg-background/80 dark:bg-background/60"
        )}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2 flex flex-col gap-6">

              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/favicon.svg"
                  alt="logo"
                  width={30}
                  height={30}
                />
                <span className="text-xl font-bold">{name}</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-md">
                {siteConfig.description}
              </p>
              {siteConfig.links.github && (
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                    >
                      {SocialIcons.Github}
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {columns.map((column, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">{column.title}</h3>
                <div className="flex flex-col gap-3">
                  {column.links.map((link, linkIndex) => (
                    <motion.div
                      key={linkIndex}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Link
                        href={link.href}
                        className="text-muted-foreground text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 inline-block"
                      >
                        {link.text}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full pb-8 gap-3">

          <div className="text-sm text-muted-foreground/75">
            {copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}