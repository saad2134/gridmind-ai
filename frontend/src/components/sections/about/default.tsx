"use client";

import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Users, Target, Award, Lightbulb } from "lucide-react";

interface AboutSectionProps {
  className?: string;
}

export default function AboutSection({ className }: AboutSectionProps) {
  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "10+", label: "Team Members" },
    { icon: <Target className="w-6 h-6" />, value: "50+", label: "Grid Systems" },
    { icon: <Award className="w-6 h-6" />, value: "98%", label: "Accuracy Rate" },
    { icon: <Lightbulb className="w-6 h-6" />, value: "24/7", label: "AI Monitoring" },
  ];

  return (
    <Section className={cn(className)} id="about">
      <div className="max-w-container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Empowering the Future of Energy
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              GridMind AI was founded with a mission to revolutionize how energy grids operate. 
              Our team of AI researchers, energy engineers, and software developers work together 
              to create intelligent systems that make renewable energy integration seamless and efficient.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We believe that by combining advanced machine learning with deep domain expertise, 
              we can build a more sustainable future. Our platform processes millions of data points 
              daily to optimize energy distribution, reduce waste, and maximize renewable energy utilization.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                AI-Powered
              </div>
              <div className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                Open Source
              </div>
              <div className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
                Cloud Native
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-primary mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
