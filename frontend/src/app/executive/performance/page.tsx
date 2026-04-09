'use client';

import { useEffect, useState } from "react";
import { api, ExecutiveData, PowerSourcesResponse } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, ComposedChart
} from "recharts";
import { 
  Zap, RefreshCw, TrendingUp, Activity, Gauge, Battery, Sun, Wind
} from "lucide-react";

export default function PerformancePage() {
  const [executiveData, setExecutiveData] = useState<ExecutiveData | null>(null);
  const [powerSources, setPowerSources] = useState<PowerSourcesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [execData, sources] = await Promise.all([
        api.getExecutiveData(),
        api.getPowerSources(),
      ]);
      setExecutiveData(execData);
      setPowerSources(sources);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const performanceMetrics = [
    { 
      icon: <Gauge className="w-5 h-5" />, 
      label: "Grid Efficiency", 
      value: "94.2%", 
      change: "+2.1%", 
      trend: "up",
      color: "text-green-500" 
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: "Energy Loss", 
      value: "3.8%", 
      change: "-0.5%", 
      trend: "down",
      color: "text-green-500" 
    },
    { 
      icon: <Activity className="w-5 h-5" />, 
      label: "System Uptime", 
      value: "99.8%", 
      change: "+0.1%", 
      trend: "up",
      color: "text-blue-500" 
    },
    { 
      icon: <Battery className="w-5 h-5" />, 
      label: "Storage Utilization", 
      value: "78%", 
      change: "+5%", 
      trend: "up",
      color: "text-purple-500" 
    },
  ];

  const efficiencyData = [
    { month: "Jan", efficiency: 91.2, target: 93, loss: 8.8 },
    { month: "Feb", efficiency: 91.8, target: 93, loss: 8.2 },
    { month: "Mar", efficiency: 92.4, target: 93, loss: 7.6 },
    { month: "Apr", efficiency: 93.1, target: 93, loss: 6.9 },
    { month: "May", efficiency: 93.8, target: 93, loss: 6.2 },
    { month: "Jun", efficiency: 94.2, target: 93, loss: 5.8 },
  ];

  const renewableData = executiveData?.renewable_trend || [];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, i) => (
          <Card key={i} className="bg-card/80 dark:bg-card/90">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-muted ${metric.color}`}>{metric.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-bold">{metric.value}</p>
                <div className={`flex items-center gap-1 text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  <TrendingUp className={`w-3 h-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Grid Efficiency Trend</CardTitle>
            <CardDescription>Efficiency vs target over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Area type="monotone" dataKey="efficiency" fill="#10B981" fillOpacity={0.3} stroke="#10B981" strokeWidth={2} name="Efficiency %" />
                <Line type="monotone" dataKey="target" stroke="#F59E0B" strokeDasharray="5 5" strokeWidth={2} name="Target %" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Renewable Integration</CardTitle>
            <CardDescription>Solar and wind output over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={renewableData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Area type="monotone" dataKey="solar" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} name="Solar (MW)" />
                <Area type="monotone" dataKey="wind" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Wind (MW)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-500" />
              Power Sources
            </CardTitle>
            <CardDescription>Current generation capacity</CardDescription>
          </CardHeader>
          <CardContent>
            {powerSources ? (
              <div className="space-y-3">
                {Object.entries(powerSources.power_sources).map(([key, source]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{source.current_output} {source.unit}</p>
                      <p className="text-xs text-muted-foreground">of {source.capacity} {source.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90 lg:col-span-2">
          <CardHeader>
            <CardTitle>System Health Indicators</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Average Response Time", value: "12ms", status: "good" },
                { label: "Peak Load Capacity", value: "45 MW", status: "good" },
                { label: "Grid Stability Index", value: "98.5", status: "good" },
                { label: "Equipment Utilization", value: "82%", status: "moderate" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
