"use client";

import { ReactNode } from "react";
import { BarChart3, Brain, Zap, Battery, Shield, Globe } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300",
        className
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 text-center">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors duration-300">
          <div className="text-primary">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

interface FeaturesSectionProps {
  className?: string;
}

export default function FeaturesSection({ className }: FeaturesSectionProps) {
  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Real-Time Forecasting",
      description: "Predict energy demand with 95%+ accuracy using advanced machine learning models trained on historical grid data.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI Decision Engine",
      description: "Autonomous decision-making powered by reinforcement learning to optimize grid operations in real-time.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Renewable Integration",
      description: "Seamlessly balance solar, wind, and traditional energy sources with intelligent load distribution.",
    },
    {
      icon: <Battery className="w-6 h-6" />,
      title: "Battery Optimization",
      description: "Maximize battery storage efficiency with predictive dispatch algorithms that minimize costs.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Grid Security",
      description: "Advanced anomaly detection protects your grid from cyber threats and equipment failures.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Scalable Architecture",
      description: "Cloud-native design supports grids of any size, from neighborhoods to entire cities.",
    },
  ];

  return (
    <section id="features">
    <Section className={cn("bg-background", className)} id="features">
      <div className="max-w-container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Grids
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            GridMind AI combines cutting-edge AI technology with deep energy domain expertise
            to deliver unprecedented grid optimization capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section></section>
  );
}
