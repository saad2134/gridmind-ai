'use client';

import { ArrowRightIcon, Zap, BarChart3, Battery, Brain } from "lucide-react";
import { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import Github from "../../logos/github";
import { Button, type ButtonProps } from "../../ui/button";
import { Section } from "../../ui/section";
import { motion } from "framer-motion";

interface HeroButtonProps {
  href: string;
  text: string;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
}

interface HeroProps {
  title?: string;
  description?: string;
  features?: ReactNode | false;
  buttons?: HeroButtonProps[] | false;
  className?: string;
}

export default function Hero({
  title = "Autonomous AI Decision Engine for Smart Energy Networks",
  description = "GridMind AI predicts energy demand, optimizes grid decisions, and explains AI reasoning in real time. Empowering the future of sustainable energy management.",
  features = (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        { icon: BarChart3, text: "Demand Forecasting", desc: "Predict next-hour energy needs" },
        { icon: Brain, text: "AI Decision Engine", desc: "Optimize grid operations" },
        { icon: Zap, text: "Renewable Integration", desc: "Balance solar & wind power" },
        { icon: Battery, text: "Battery Optimization", desc: "Smart storage dispatch" },
      ].map((feature, i) => (
        <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-primary/10 hover:shadow-lg hover:border-primary/20 cursor-pointer">
          <feature.icon className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-xs">{feature.text}</p>
            <p className="text-[10px] text-muted-foreground">{feature.desc}</p>
          </div>
        </div>
      ))}
    </div>
  ),
  buttons = [
    {
      href: '/app/dashboard',
      text: "Go to App",
      variant: "default",
      icon: <ArrowRightIcon className="mr-2 size-4" />,
    },
    {
      href: siteConfig.links.github,
      text: "View on GitHub",
      variant: "outline",
      icon: <Github className="mr-2 size-4" />,
    },
  ],
  className,
}: HeroProps) {
  return (
    <Section
      className={cn(
        "overflow-hidden relative py-12 md:py-14 bg-background",
        className,
      )}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10 bg-black">
        <motion.div
          className="absolute top-10 left-10 w-[150px] h-[150px] rounded-full bg-primary/20 blur-[60px]"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-10 right-10 w-[120px] h-[120px] rounded-full bg-secondary/20 blur-[50px]"
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[80px] h-[80px] rounded-full bg-accent/15 blur-[40px]"
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
      
      <div className="max-w-container mx-auto flex flex-col gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
          <h1 className="animate-appear from-foreground to-foreground dark:to-muted-foreground relative z-10 inline-block bg-linear-to-r bg-clip-text text-3xl leading-tight font-semibold text-transparent drop-shadow-2xl sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl animate-appear text-muted-foreground relative z-10 max-w-[840px] font-medium text-balance opacity-0 delay-100 px-2">
            {description}
          </p>
          
          {buttons !== false && buttons.length > 0 && (
            <div className="animate-appear relative z-10 flex flex-wrap justify-center gap-3 sm:gap-4 opacity-0 delay-300">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || "default"}
                  size="default"
                  asChild
                >
                  <a href={button.href}>
                    {button.icon}
                    {button.text}
                  </a>
                </Button>
              ))}
            </div>
          )}
          
          {features !== false && (
            <div className="w-full pt-4 animate-appear opacity-0 delay-500">
              {features}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}