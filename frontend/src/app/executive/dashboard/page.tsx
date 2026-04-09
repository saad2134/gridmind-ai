'use client';

import { useEffect, useState } from "react";
import { api, ExecutiveData, PowerSourcesResponse } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import { 
  Zap, Sun, Wind, Battery, TrendingUp, TrendingDown, DollarSign, Users, Activity, RefreshCw, Globe
} from "lucide-react";

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

export default function ExecutiveDashboardPage() {
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

  const pieData = powerSources ? Object.entries(powerSources.power_sources).map(([key, source]) => ({
    name: source.name,
    value: source.current_output,
    color: source.color,
  })) : [];

  const kpiCards = [
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: "Total Energy Demand", 
      value: `${executiveData?.kpis.total_demand || 0} MW`, 
      change: "+5.2%", 
      trend: "up",
      color: "text-primary" 
    },
    { 
      icon: <DollarSign className="w-5 h-5" />, 
      label: "Operational Cost", 
      value: `₹${executiveData?.kpis.operational_cost || 0}K`, 
      change: "-12.4%", 
      trend: "down",
      color: "text-green-500" 
    },
    { 
      icon: <TrendingUp className="w-5 h-5" />, 
      label: "Grid Efficiency", 
      value: `${executiveData?.kpis.grid_efficiency || 0}%`, 
      change: "+2.1%", 
      trend: "up",
      color: "text-blue-500" 
    },
    { 
      icon: <Users className="w-5 h-5" />, 
      label: "Consumers Served", 
      value: executiveData?.kpis.consumers_served?.toLocaleString() || "0", 
      change: "+1,250", 
      trend: "up",
      color: "text-purple-500" 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((stat, i) => (
          <Card key={i} className="bg-card/80 dark:bg-card/90">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>{stat.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
                <div className={`flex items-center gap-1 text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-green-500'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Energy Demand Trend</CardTitle>
            <CardDescription>Monthly demand forecast vs actual</CardDescription>
          </CardHeader>
          <CardContent>
            {executiveData ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={executiveData.demand_trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                  />
                  <Area type="monotone" dataKey="forecast" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="actual" stackId="2" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Power Source Mix</CardTitle>
            <CardDescription>Current generation by source</CardDescription>
          </CardHeader>
          <CardContent>
            {powerSources ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Renewable Integration</CardTitle>
            <CardDescription>Solar and wind performance</CardDescription>
          </CardHeader>
          <CardContent>
            {executiveData ? (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={executiveData.renewable_trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                  />
                  <Line type="monotone" dataKey="solar" stroke="#F59E0B" strokeWidth={2} />
                  <Line type="monotone" dataKey="wind" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>Operational cost analysis</CardDescription>
          </CardHeader>
          <CardContent>
            {executiveData ? (
              <div className="space-y-4">
                {executiveData.cost_breakdown.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-sm">{item.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{item.amount}K</p>
                      <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
