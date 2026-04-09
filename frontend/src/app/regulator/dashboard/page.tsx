'use client';

import { useEffect, useState } from "react";
import { api, RegulatorData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { 
  Zap, Shield, FileCheck, AlertTriangle, TrendingUp, TrendingDown, RefreshCw, CheckCircle, XCircle, Activity
} from "lucide-react";

export default function RegulatorDashboardPage() {
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

  const kpiCards = [
    { 
      icon: <Shield className="w-5 h-5" />, 
      label: "Compliance Score", 
      value: `${regulatorData?.compliance.score || 0}%`, 
      subtext: regulatorData?.compliance.status === 'compliant' ? 'All standards met' : 'Action required',
      color: regulatorData?.compliance.status === 'compliant' ? 'text-green-500' : 'text-red-500' 
    },
    { 
      icon: <Zap className="w-5 h-5" />, 
      label: "Grid Uptime", 
      value: `${regulatorData?.reliability.uptime || 0}%`, 
      subtext: 'Last 30 days',
      color: "text-blue-500" 
    },
    { 
      icon: <Activity className="w-5 h-5" />, 
      label: "Safety Incidents", 
      value: `${regulatorData?.safety.incidents || 0}`, 
      subtext: 'This quarter',
      color: regulatorData?.safety.incidents === 0 ? 'text-green-500' : 'text-red-500' 
    },
    { 
      icon: <FileCheck className="w-5 h-5" />, 
      label: "Reports Due", 
      value: `${regulatorData?.reports.due || 0}`, 
      subtext: 'In next 30 days',
      color: "text-orange-500" 
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
            <CardTitle>Compliance Trend</CardTitle>
            <CardDescription>Monthly compliance scores</CardDescription>
          </CardHeader>
          <CardContent>
            {regulatorData ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={regulatorData.compliance_trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Grid Reliability Index</CardTitle>
            <CardDescription>Key reliability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            {regulatorData ? (
              <div className="space-y-4">
                {regulatorData.reliability_metrics.map((metric, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {metric.status === 'good' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium">{metric.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{metric.value}</p>
                      <p className="text-xs text-muted-foreground">{metric.target}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-500" />
              Compliance Status
            </CardTitle>
            <CardDescription>Regulatory standards</CardDescription>
          </CardHeader>
          <CardContent>
            {regulatorData ? (
              <div className="space-y-3">
                {regulatorData.compliance_standards.map((standard, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{standard.name}</span>
                    {standard.compliant ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
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
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Recent Alerts
            </CardTitle>
            <CardDescription>System notifications</CardDescription>
          </CardHeader>
          <CardContent>
            {regulatorData ? (
              <div className="space-y-3">
                {regulatorData.alerts.map((alert, i) => (
                  <div key={i} className={`p-3 rounded-lg ${alert.severity === 'high' ? 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800' : 'bg-muted/50'}`}>
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
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
              <Shield className="w-5 h-5 text-green-500" />
              Safety Metrics
            </CardTitle>
            <CardDescription>Safety performance</CardDescription>
          </CardHeader>
          <CardContent>
            {regulatorData ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Safety Score</span>
                  <span className="font-bold">{regulatorData.safety.score}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Days Without Incident</span>
                  <span className="font-bold">{regulatorData.safety.days_without_incident}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inspections Passed</span>
                  <span className="font-bold">{regulatorData.safety.inspections_passed}/{regulatorData.safety.inspections_total}</span>
                </div>
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
