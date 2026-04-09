'use client';

import { useEffect, useState } from "react";
import { api, RegulatorData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { 
  Shield, RefreshCw, CheckCircle, Activity, Zap, Clock
} from "lucide-react";

export default function ReliabilityPage() {
  const [regulatorData, setRegulatorData] = useState<RegulatorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getRegulatorData();
      setRegulatorData(data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const reliabilityMetrics = [
    { 
      icon: <Shield className="w-5 h-5" />, 
      label: "Grid Uptime", 
      value: `${regulatorData?.reliability.uptime || 0}%`, 
      color: "text-green-500" 
    },
    { 
      icon: <Activity className="w-5 h-5" />, 
      label: "SAIDI", 
      value: "2.4 min", 
      subtext: "Target: < 5 min",
      color: "text-green-500" 
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: "SAIFI", 
      value: "0.8", 
      subtext: "Target: < 1.0",
      color: "text-green-500" 
    },
    { 
      icon: <Clock className="w-5 h-5" />, 
      label: "CAIDI", 
      value: "3.0 min", 
      subtext: "Target: < 5 min",
      color: "text-green-500" 
    },
  ];

  const reliabilityHistory = [
    { month: "Jan", saidi: 2.8, saifi: 0.9, asa: 99.92 },
    { month: "Feb", saidi: 2.6, saifi: 0.85, asa: 99.94 },
    { month: "Mar", saidi: 2.9, saifi: 0.92, asa: 99.91 },
    { month: "Apr", saidi: 2.4, saifi: 0.8, asa: 99.95 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reliabilityMetrics.map((metric, i) => (
          <Card key={i} className="bg-card/80 dark:bg-card/90">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-muted ${metric.color}`}>{metric.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-bold">{metric.value}</p>
                {metric.subtext && <p className="text-xs text-muted-foreground">{metric.subtext}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Reliability Metrics Trend</CardTitle>
            <CardDescription>SAIDI and SAIFI over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reliabilityHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Line type="monotone" dataKey="saidi" stroke="#3B82F6" strokeWidth={2} name="SAIDI (min)" />
                <Line type="monotone" dataKey="saifi" stroke="#10B981" strokeWidth={2} name="SAIFI" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Reliability Standards</CardTitle>
            <CardDescription>Current performance vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            {regulatorData ? (
              <div className="space-y-4">
                {regulatorData.reliability_metrics.map((metric, i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        {metric.status === 'good' ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : null}
                        <span className="font-bold">{metric.value}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Target: {metric.target}</span>
                      <span className={metric.status === 'good' ? 'text-green-500' : 'text-red-500'}>
                        {metric.status === 'good' ? 'Meets' : 'Below'} Target
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Monthly Availability</CardTitle>
          <CardDescription>Grid availability percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={reliabilityHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[99.8, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
              />
              <Bar dataKey="asa" fill="#10B981" radius={[4, 4, 0, 0]} name="Availability %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
