'use client';

import { useEffect, useState } from "react";
import { api, ExecutiveData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line
} from "recharts";
import { 
  DollarSign, TrendingUp, TrendingDown, RefreshCw, PiggyBank, CreditCard, Wallet, Activity
} from "lucide-react";

export default function FinancialPage() {
  const [executiveData, setExecutiveData] = useState<ExecutiveData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getExecutiveData();
      setExecutiveData(data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const financialMetrics = [
    { 
      icon: <Wallet className="w-5 h-5" />, 
      label: "Revenue (YTD)", 
      value: "₹4.2M", 
      change: "+8.2%", 
      trend: "up",
      color: "text-green-500" 
    },
    { 
      icon: <PiggyBank className="w-5 h-5" />, 
      label: "Net Profit", 
      value: "₹1.8M", 
      change: "+12.4%", 
      trend: "up",
      color: "text-green-500" 
    },
    { 
      icon: <CreditCard className="w-5 h-5" />, 
      label: "Operating Expenses", 
      value: "₹2.4M", 
      change: "-5.1%", 
      trend: "down",
      color: "text-green-500" 
    },
    { 
      icon: <Activity className="w-5 h-5" />, 
      label: "Profit Margin", 
      value: "42.8%", 
      change: "+2.1%", 
      trend: "up",
      color: "text-blue-500" 
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 680, expenses: 420 },
    { month: "Feb", revenue: 720, expenses: 380 },
    { month: "Mar", revenue: 750, expenses: 400 },
    { month: "Apr", revenue: 810, expenses: 390 },
    { month: "May", revenue: 780, expenses: 410 },
    { month: "Jun", revenue: 860, expenses: 380 },
  ];

  const costData = executiveData?.cost_breakdown || [];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialMetrics.map((metric, i) => (
          <Card key={i} className="bg-card/80 dark:bg-card/90">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-muted ${metric.color}`}>{metric.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-bold">{metric.value}</p>
                <div className={`flex items-center gap-1 text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
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
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly comparison for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Revenue" />
                <Area type="monotone" dataKey="expenses" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>Operational cost distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="category" width={100} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Bar dataKey="amount" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>ROI by Project</CardTitle>
          <CardDescription>Return on investment for major initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { project: "Solar Expansion", investment: "₹2.5M", roi: "+24%", status: "excellent" },
              { project: "Grid Modernization", investment: "₹1.8M", roi: "+18%", status: "good" },
              { project: "Battery Storage", investment: "₹1.2M", roi: "+15%", status: "good" },
              { project: "Smart Meter Rollout", investment: "₹800K", roi: "+12%", status: "moderate" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{item.project}</p>
                  <p className="text-sm text-muted-foreground">Investment: {item.investment}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${item.status === 'excellent' ? 'text-green-500' : item.status === 'good' ? 'text-blue-500' : 'text-orange-500'}`}>
                    {item.roi}
                  </p>
                  <p className="text-xs text-muted-foreground">ROI</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
