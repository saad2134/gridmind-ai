'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, AlertCircle, Info, RefreshCw, Bell, Zap, Battery, Activity, Shield
} from "lucide-react";

interface Alert {
  id: number;
  timestamp: string;
  type: "warning" | "critical" | "info";
  category: string;
  message: string;
  location: string;
  status: "active" | "acknowledged" | "resolved";
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const mockAlerts: Alert[] = [
        { id: 1, timestamp: "2026-04-09 16:45:00", type: "warning", category: "Grid", message: "Voltage fluctuation detected in Sector 7", location: "Substation 7", status: "active" },
        { id: 2, timestamp: "2026-04-09 16:30:00", type: "critical", category: "Equipment", message: "Transformer overheating in North Station", location: "Transformer T-12", status: "active" },
        { id: 3, timestamp: "2026-04-09 16:15:00", type: "info", category: "Demand", message: "Peak demand expected in 2 hours", location: "Grid-wide", status: "acknowledged" },
        { id: 4, timestamp: "2026-04-09 16:00:00", type: "warning", category: "Battery", message: "Battery storage below 30% in South District", location: "Storage Unit B-02", status: "active" },
        { id: 5, timestamp: "2026-04-09 15:45:00", type: "info", category: "Maintenance", message: "Scheduled maintenance completed on Line L-14", location: "Transmission Line L-14", status: "resolved" },
        { id: 6, timestamp: "2026-04-09 15:30:00", type: "critical", category: "Frequency", message: "Grid frequency dropped below 59.9 Hz", location: "Grid-wide", status: "resolved" },
        { id: 7, timestamp: "2026-04-09 15:15:00", type: "warning", category: "Renewable", message: "Solar output below expected levels due to cloud cover", location: "Solar Farm S-03", status: "acknowledged" },
      ];
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Failed to load alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "warning": return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "info": return <Info className="w-5 h-5 text-blue-500" />;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Grid": return <Zap className="w-4 h-4" />;
      case "Battery": return <Battery className="w-4 h-4" />;
      case "Frequency": return <Activity className="w-4 h-4" />;
      case "Equipment": return <Shield className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const filteredAlerts = filter === "all" ? alerts : alerts.filter(a => a.status === filter);

  const activeAlerts = alerts.filter(a => a.status === "active").length;
  const criticalAlerts = alerts.filter(a => a.type === "critical" && a.status === "active").length;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Critical Alerts</p>
              <p className="text-xl font-bold">{criticalAlerts}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
              <p className="text-xl font-bold">{activeAlerts}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Alerts (24h)</p>
              <p className="text-xl font-bold">{alerts.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-xl font-bold">{alerts.filter(a => a.status === "resolved").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2">
        {["all", "active", "acknowledged", "resolved"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Alert History</CardTitle>
          <CardDescription>Recent system alerts and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg flex items-start gap-4 ${
                  alert.type === "critical" ? "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800" :
                  alert.type === "warning" ? "bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800" :
                  "bg-muted/50"
                }`}
              >
                <div className="mt-1">
                  {getTypeIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{alert.category}</span>
                    <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {alert.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    alert.status === 'active' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                    alert.status === 'acknowledged' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {alert.status}
                  </span>
                  {alert.status === "active" && (
                    <Button size="sm" variant="outline">Acknowledge</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
