'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Target, RefreshCw, CheckCircle, XCircle, AlertTriangle, Zap, Battery
} from "lucide-react";

interface Decision {
  id: number;
  timestamp: string;
  type: string;
  action: string;
  amount: number;
  unit: string;
  reason: string;
  status: "executed" | "pending" | "rejected";
}

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const mockDecisions: Decision[] = [
        { id: 1, timestamp: "2026-04-09 16:45:00", type: "Demand Response", action: "battery_discharge", amount: 2.5, unit: "MW", reason: "High demand predicted (14.2 MW). Activate battery storage to reduce grid load.", status: "executed" },
        { id: 2, timestamp: "2026-04-09 16:30:00", type: "Renewable Optimization", action: "charge_storage", amount: 1.8, unit: "MW", reason: "High solar output (3.2 MW). Charge battery storage for later use.", status: "executed" },
        { id: 3, timestamp: "2026-04-09 16:15:00", type: "Load Balancing", action: "reduce_noncritical_load", amount: 1.2, unit: "MW", reason: "Peak demand approaching. Reduce non-critical loads to maintain grid stability.", status: "executed" },
        { id: 4, timestamp: "2026-04-09 16:00:00", type: "Frequency Control", action: "maintain", amount: 0, unit: "MW", reason: "Grid frequency stable at 60.0 Hz. No action required.", status: "executed" },
        { id: 5, timestamp: "2026-04-09 15:45:00", type: "Demand Response", action: "battery_discharge", amount: 2.1, unit: "MW", reason: "Evening peak predicted. Pre-discharge battery storage.", status: "executed" },
      ];
      setDecisions(mockDecisions);
    } catch (error) {
      console.error('Failed to load decisions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "executed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "rejected": return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "battery_discharge": return <Battery className="w-4 h-4" />;
      case "charge_storage": return <Battery className="w-4 h-4" />;
      case "reduce_noncritical_load": return <Zap className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Decisions (24h)</p>
            <p className="text-2xl font-bold">48</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Executed</p>
            <p className="text-2xl font-bold text-green-500">45</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-orange-500">2</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Rejected</p>
            <p className="text-2xl font-bold text-red-500">1</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Recent Decisions</CardTitle>
          <CardDescription>AI decision log with timestamps and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {decisions.map((decision) => (
              <div key={decision.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  {getActionIcon(decision.action)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{decision.type}</span>
                    <span className="text-xs text-muted-foreground">{decision.timestamp}</span>
                  </div>
                  <p className="text-sm">{decision.reason}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm">
                      <strong>{decision.action.replace(/_/g, ' ')}</strong>: {decision.amount} {decision.unit}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(decision.status)}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    decision.status === 'executed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                    decision.status === 'pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {decision.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Decision Categories</CardTitle>
          <CardDescription>Breakdown of AI decision types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { category: "Demand Response", count: 18 },
              { category: "Renewable Optimization", count: 12 },
              { category: "Load Balancing", count: 10 },
              { category: "Frequency Control", count: 8 },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-sm text-muted-foreground">{item.category}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
