'use client';

import { useEffect, useState } from "react";
import { api, ExecutiveData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, ComposedChart, ScatterChart, Scatter
} from "recharts";
import { 
  RefreshCw, TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Zap, Sun, Wind
} from "lucide-react";

export default function AnalyticsPage() {
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

  const demandForecastData = [
    { hour: "00:00", predicted: 18.2, actual: 17.8 },
    { hour: "04:00", predicted: 15.4, actual: 15.1 },
    { hour: "08:00", predicted: 22.5, actual: 23.1 },
    { hour: "12:00", predicted: 28.3, actual: 27.9 },
    { hour: "16:00", predicted: 32.1, actual: 31.8 },
    { hour: "20:00", predicted: 29.5, actual: 30.2 },
    { hour: "24:00", predicted: 21.2, actual: 20.8 },
  ];

  const peakUsageData = [
    { time: "6-9 AM", usage: 45, category: "Morning Peak" },
    { time: "9-12 PM", usage: 38, category: "Mid-day" },
    { time: "12-3 PM", usage: 42, category: "Afternoon" },
    { time: "3-6 PM", usage: 52, category: "Pre-peak" },
    { time: "6-9 PM", usage: 68, category: "Evening Peak" },
    { time: "9-12 AM", usage: 35, category: "Night" },
  ];

  const correlationData = [
    { temp: 15, demand: 12 },
    { temp: 20, demand: 15 },
    { temp: 25, demand: 18 },
    { temp: 30, demand: 24 },
    { temp: 35, demand: 32 },
    { temp: 40, demand: 38 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              24-Hour Demand Forecast
            </CardTitle>
            <CardDescription>Predicted vs actual energy demand</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={demandForecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Line type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={2} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-500" />
              Peak Usage Patterns
            </CardTitle>
            <CardDescription>Energy usage by time of day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Bar dataKey="usage" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Temperature vs Demand Correlation
            </CardTitle>
            <CardDescription>How temperature affects energy demand</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="temp" name="Temperature" unit="°C" />
                <YAxis dataKey="demand" name="Demand" unit="MW" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter name="Temperature vs Demand" data={correlationData} fill="#10B981" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>AI-generated strategic recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { insight: "Peak demand occurs 6-9 PM", impact: "High", action: "Consider time-of-use pricing" },
                { insight: "Temperature correlation: Strong (r=0.92)", impact: "Medium", action: "Prepare for summer demand surge" },
                { insight: "Solar generation peak at noon", impact: "High", action: "Maximize battery charging during noon" },
                { insight: "Weekend usage 15% lower", impact: "Low", action: "Adjust maintenance scheduling" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{item.insight}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.impact === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                      item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {item.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">→ {item.action}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Year-over-Year Comparison</CardTitle>
          <CardDescription>Performance metrics compared to last year</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={executiveData?.demand_trend || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
              />
              <Bar dataKey="forecast" fill="#6366F1" name="This Year" />
              <Line type="monotone" dataKey="actual" stroke="#F59E0B" strokeWidth={2} name="Last Year" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
