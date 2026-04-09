'use client';

import { useEffect, useState } from "react";
import { api, ConsumerData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { 
  Zap, Sun, Wind, Battery, TrendingDown, CreditCard, Leaf, RefreshCw, Home, PiggyBank
} from "lucide-react";

export default function ConsumerDashboardPage() {
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

  const kpiCards = [
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: "Current Usage", 
      value: `${consumerData?.current_usage.power || 0} kW`, 
      subtext: `${consumerData?.current_usage.cost || 0}/hr`,
      color: "text-primary" 
    },
    { 
      icon: <PiggyBank className="w-5 h-5" />, 
      label: "This Month", 
      value: `₹${consumerData?.monthly_cost.total || 0}`, 
      subtext: `${consumerData?.monthly_cost.kwh || 0} kWh used`,
      color: "text-green-500" 
    },
    { 
      icon: <TrendingDown className="w-5 h-5" />, 
      label: "Savings", 
      value: `₹${consumerData?.savings.amount || 0}`, 
      subtext: `${consumerData?.savings.percentage || 0}% vs average`,
      color: "text-blue-500" 
    },
    { 
      icon: <Leaf className="w-5 h-5" />, 
      label: "Green Energy", 
      value: `${consumerData?.green_energy.percentage || 0}%`, 
      subtext: "Renewable sources",
      color: "text-green-600" 
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
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Daily Usage Pattern</CardTitle>
            <CardDescription>Your energy consumption over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            {consumerData ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={consumerData.daily_usage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                  />
                  <Line type="monotone" dataKey="usage" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

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
                  <Bar dataKey="usage" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Peak Hours
            </CardTitle>
            <CardDescription>Highest usage times</CardDescription>
          </CardHeader>
          <CardContent>
            {consumerData ? (
              <div className="space-y-3">
                {consumerData.peak_hours.map((peak, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded bg-muted/50">
                    <span className="text-sm">{peak.time}</span>
                    <span className="font-medium">{peak.usage} kWh</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-500" />
              Green Energy
            </CardTitle>
            <CardDescription>Your renewable usage</CardDescription>
          </CardHeader>
          <CardContent>
            {consumerData ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Solar</span>
                  <span className="font-medium">{consumerData.green_energy.solar}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${consumerData.green_energy.solar}%` }} />
                </div>
                <div className="flex justify-between text-sm">
                  <span>Wind</span>
                  <span className="font-medium">{consumerData.green_energy.wind}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${consumerData.green_energy.wind}%` }} />
                </div>
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              Billing
            </CardTitle>
            <CardDescription>Payment summary</CardDescription>
          </CardHeader>
          <CardContent>
            {consumerData ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Balance</span>
                  <span className="font-bold">₹{consumerData.billing.current_balance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Due Date</span>
                  <span>{consumerData.billing.due_date}</span>
                </div>
                <Button className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Bill
                </Button>
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
