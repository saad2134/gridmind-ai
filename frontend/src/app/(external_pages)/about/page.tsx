import { Zap } from "lucide-react";
import AppIcon from "@/components/logos/app_icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <AppIcon size={64} />
        </div>
        <h1 className="text-4xl font-bold mb-4">About GridMind AI</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          GridMind AI is an autonomous decision intelligence platform for smart energy grids. 
          We combine predictive AI, reinforcement learning, and explainable AI to help energy 
          operators make optimal decisions in real time.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="p-6 rounded-lg border bg-card">
          <Zap className="w-10 h-10 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-muted-foreground">
            To power the future of sustainable energy management through autonomous AI decision intelligence.
          </p>
        </div>
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
          <p className="text-muted-foreground">
            Self-optimizing energy networks powered by AI that continuously monitor, predict, and optimize complex grid operations.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}