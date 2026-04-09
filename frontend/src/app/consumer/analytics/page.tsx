'use client';

import { useEffect, useState } from "react";
import { api, ConsumerData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";
import { 
  RefreshCw, TrendingUp, TrendingDown, BarChart3, Calendar
} from "lucide-react";

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

export default function AnalyticsPage() {
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

  const monthlyComparison = [
    { month: "Jan", current: 162, previous: 175 },
    { month: "Feb", current: 145, previous: 158 },
    { month: "Mar", current: 138, previous: 152 },
    { month: "Apr", current: 142, previous: 165 },
  ];

  const pieData = consumerData?.appliance_breakdown.map((item, i) => ({
    name: item.appliance,
    value: item.usage,
    color: COLORS[i % COLORS.length],
  })) || [];

  const comparisonStats = [
    { label: "vs Last Month", value: "-8.2%", positive: true },
    { label: "vs Last Year", value: "-12.5%", positive: true },
    { label: "vs Average Home", value: "-15%", positive: true },
    { label: "Neighborhood Rank", value: "#42", positive: null },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {comparisonStats.map((stat, i) => (
          <Card key={i} className="bg-card/80 dark:bg-card/90">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.positive === true ? 'text-green-500' : stat.positive === false ? 'text-red-500' : ''}`}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Monthly Comparison
            </CardTitle>
            <CardDescription>Current vs previous year usage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Line type="monotone" dataKey="current" stroke="#10B981" strokeWidth={2} name="Current Year" />
                <Line type="monotone" dataKey="previous" stroke="#EF4444" strokeWidth={2} name="Previous Year" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Usage Distribution</CardTitle>
            <CardDescription>Energy breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
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
                    label={({ name, value }) => `${name}: ${value}%`}
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

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Usage Trends</CardTitle>
          <CardDescription>Daily usage pattern analysis</CardDescription>
        </CardHeader>
        <CardContent>
          {consumerData ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={consumerData.daily_usage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Usage (kWh)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Insights</CardTitle>
          <CardDescription>AI-generated personalized insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { insight: "Weekend Usage Higher", description: "Your weekend usage is 22% higher than weekdays", type: "info" },
              { insight: "Peak Hour Alert", description: "Most of your usage occurs during peak hours (6-9 PM)", type: "warning" },
              { insight: "Great Progress!", description: "You're using 15% less energy than average", type: "success" },
              { insight: "AC Optimization", description: "Consider raising thermostat by 2°F to save 5%", type: "tip" },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-lg ${
                item.type === 'warning' ? 'bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800' :
                item.type === 'success' ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' :
                'bg-muted/50'
              }`}>
                <p className="font-medium mb-1">{item.insight}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
