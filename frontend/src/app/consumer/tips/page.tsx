'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Leaf, Lightbulb, Zap, Sun, Wind, Thermometer, Clock, Home, Award
} from "lucide-react";

const tips = [
  {
    category: "Peak Hour Saving",
    icon: <Clock className="w-5 h-5" />,
    color: "bg-orange-500/10 text-orange-500",
    tips: [
      "Shift high-energy activities to off-peak hours (10 PM - 6 AM)",
      "Use timers on dishwashers and washing machines to run during off-peak",
      "Pre-cool your home before peak hours and maintain with AC",
      "Charge electric vehicles overnight",
    ],
  },
  {
    category: "Lighting",
    icon: <Lightbulb className="w-5 h-5" />,
    color: "bg-yellow-500/10 text-yellow-500",
    tips: [
      "Replace incandescent bulbs with LED lights (up to 80% savings)",
      "Use natural daylight when possible",
      "Install motion sensors in low-traffic areas",
      "Use smart lighting schedules",
    ],
  },
  {
    category: "HVAC Efficiency",
    icon: <Thermometer className="w-5 h-5" />,
    color: "bg-blue-500/10 text-blue-500",
    tips: [
      "Set thermostat to 68°F (20°C) in winter, 78°F (26°C) in summer",
      "Use ceiling fans to improve air circulation",
      " Seal air leaks around windows and doors",
      "Schedule annual HVAC maintenance",
    ],
  },
  {
    category: "Appliance Use",
    icon: <Home className="w-5 h-5" />,
    color: "bg-purple-500/10 text-purple-500",
    tips: [
      "Run full loads in dishwasher and washing machine",
      "Air dry clothes when possible",
      "Unplug devices when not in use (phantom energy)",
      "Use energy-efficient appliance settings",
    ],
  },
  {
    category: "Renewable Energy",
    icon: <Sun className="w-5 h-5" />,
    color: "bg-green-500/10 text-green-500",
    tips: [
      "Consider installing solar panels",
      "Use solar chargers for small devices",
      "Participate in community solar programs",
      "Time heavy usage to solar peak hours",
    ],
  },
];

const challenges = [
  { name: "7-Day Saver", description: "Use under 100 kWh for a week", progress: 65, reward: "₹10 credit" },
  { name: "Peak Avoider", description: "Avoid peak hour usage for a month", progress: 40, reward: "₹15 credit" },
  { name: "Green Champion", description: "Use 50%+ renewable energy", progress: 85, reward: "₹20 credit" },
];

export default function TipsPage() {
  return (
    <div className="p-6 space-y-6">
      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Energy Savings Challenge
          </CardTitle>
          <CardDescription>Earn credits by completing energy-saving challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((challenge, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50">
                <p className="font-medium">{challenge.name}</p>
                <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{challenge.progress}%</span>
                  <span className="text-green-500 font-medium">{challenge.reward}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((category, i) => (
          <Card key={i} className="bg-card/80 dark:bg-card/90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  {category.icon}
                </div>
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {category.tips.map((tip, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Leaf className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Quick Tips Summary</CardTitle>
          <CardDescription>Top 5 actions for immediate savings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { tip: "LED Bulbs", saving: "₹100/year" },
              { tip: "Smart Thermostat", saving: "₹150/year" },
              { tip: "Unplug Devices", saving: "₹50/year" },
              { tip: "Off-Peak Usage", saving: "₹75/year" },
              { tip: "Full Loads", saving: "₹25/year" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="font-medium mb-1">{item.tip}</p>
                <p className="text-sm text-green-500">{item.saving}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
