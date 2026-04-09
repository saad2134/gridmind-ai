'use client';

import { useEffect, useState } from "react";
import { api, RegulatorData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { 
  FileCheck, RefreshCw, CheckCircle, XCircle, AlertTriangle, Shield
} from "lucide-react";

export default function CompliancePage() {
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

  const complianceMetrics = [
    { 
      icon: <Shield className="w-5 h-5" />, 
      label: "Compliance Score", 
      value: `${regulatorData?.compliance.score || 0}%`, 
      color: regulatorData?.compliance.status === 'compliant' ? "text-green-500" : "text-red-500"
    },
    { 
      icon: <FileCheck className="w-5 h-5" />, 
      label: "Standards Met", 
      value: "5/5", 
      color: "text-green-500" 
    },
    { 
      icon: <CheckCircle className="w-5 h-5" />, 
      label: "Inspections", 
      value: "12/12", 
      color: "text-blue-500" 
    },
    { 
      icon: <AlertTriangle className="w-5 h-5" />, 
      label: "Open Issues", 
      value: "0", 
      color: "text-green-500" 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {complianceMetrics.map((metric, i) => (
          <Card key={i} className="bg-card/80 dark:bg-card/90">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-muted ${metric.color}`}>{metric.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-xl font-bold">{metric.value}</p>
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
                  <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981' }} name="Score %" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Compliance Standards</CardTitle>
            <CardDescription>Status of regulatory standards</CardDescription>
          </CardHeader>
          <CardContent>
            {regulatorData ? (
              <div className="space-y-4">
                {regulatorData.compliance_standards.map((standard, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      {standard.compliant ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium">{standard.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      standard.compliant 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {standard.compliant ? 'Compliant' : 'Non-compliant'}
                    </span>
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
          <CardTitle>Compliance Checklist</CardTitle>
          <CardDescription>Required compliance activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { item: "Q1 2026 Safety Report", due: "2026-04-15", status: "completed" },
              { item: "Environmental Impact Assessment", due: "2026-04-30", status: "in_progress" },
              { item: "Grid Reliability Certification", due: "2026-05-15", status: "pending" },
              { item: "Data Privacy Audit", due: "2026-05-31", status: "pending" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{item.item}</p>
                  <p className="text-sm text-muted-foreground">Due: {item.due}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                  item.status === 'in_progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 
                  'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                }`}>
                  {item.status.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
