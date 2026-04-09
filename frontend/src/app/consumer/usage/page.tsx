'use client';

import { useEffect, useState } from "react";
import { api, ConsumerData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area
} from "recharts";
import { 
  Zap, RefreshCw, TrendingDown, Clock, Calendar, Home
} from "lucide-react";

export default function UsagePage() {
  const [consumerData, setConsumerData] = useState<ConsumerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getConsumerData();
      setConsumerData(data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const hourlyUsage = [
    { hour: "12AM", usage: 0.3 },
    { hour: "2AM", usage: 0.2 },
    { hour: "4AM", usage: 0.2 },
    { hour: "6AM", usage: 0.4 },
    { hour: "8AM", usage: 1.2 },
    { hour: "10AM", usage: 1.5 },
    { hour: "12PM", usage: 1.8 },
    { hour: "2PM", usage: 1.6 },
    { hour: "4PM", usage: 1.4 },
    { hour: "6PM", usage: 2.1 },
    { hour: "8PM", usage: 1.9 },
    { hour: "10PM", usage: 0.8 },
  ];

  const usageStats = [
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: "Today's Usage", 
      value: `${(consumerData?.current_usage.power || 0).toFixed(1)} kWh`,
      color: "text-primary" 
    },
    { 
      icon: <TrendingDown className="w-5 h-5" />, 
      label: "vs Yesterday", 
      value: "-12%",
      color: "text-green-500" 
    },
    { 
      icon: <Calendar className="w-5 h-5" />, 
      label: "This Month", 
      value: `${consumerData?.monthly_cost.kwh || 0} kWh`,
      color: "text-blue-500" 
    },
    { 
      icon: <Home className="w-5 h-5" />, 
      label: "Daily Average", 
      value: "16.2 kWh",
      color: "text-purple-500" 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {usageStats.map((stat, i) => (
          <Card key={i} className="bg-card/80 dark:bg-card/90">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>{stat.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Today's Hourly Usage</CardTitle>
            <CardDescription>Energy consumption by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={hourlyUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Usage (kWh)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Weekly Pattern</CardTitle>
            <CardDescription>Energy consumption by day</CardDescription>
          </CardHeader>
          <CardContent>
            {consumerData ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={consumerData.daily_usage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                  />
                  <Bar dataKey="usage" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Usage (kWh)" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Appliance Breakdown</CardTitle>
          <CardDescription>Energy usage by appliance category</CardDescription>
        </CardHeader>
        <CardContent>
          {consumerData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consumerData.appliance_breakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="appliance" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Bar dataKey="usage" fill="#8B5CF6" radius={[0, 4, 4, 0]} name="Usage %" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
