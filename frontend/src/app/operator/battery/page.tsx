'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Battery, BatteryCharging, BatteryLow, RefreshCw, Zap, Clock, TrendingUp, Activity
} from "lucide-react";

interface BatteryData {
  id: string;
  name: string;
  capacity: number;
  current_charge: number;
  status: "charging" | "discharging" | "standby";
  health: number;
  last_updated: string;
}

export default function BatteryPage() {
  const [batteries, setBatteries] = useState<BatteryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const mockBatteries: BatteryData[] = [
        { id: "bat-001", name: "North Station Storage", capacity: 50, current_charge: 42, status: "charging", health: 98, last_updated: "2026-04-09 16:45:00" },
        { id: "bat-002", name: "South District Storage", capacity: 75, current_charge: 58, status: "discharging", health: 95, last_updated: "2026-04-09 16:44:30" },
        { id: "bat-003", name: "Industrial Zone A", capacity: 100, current_charge: 85, status: "standby", health: 97, last_updated: "2026-04-09 16:44:00" },
        { id: "bat-004", name: "Commercial Hub", capacity: 30, current_charge: 24, status: "charging", health: 92, last_updated: "2026-04-09 16:43:30" },
        { id: "bat-005", name: "Residential Complex B", capacity: 45, current_charge: 38, status: "discharging", health: 94, last_updated: "2026-04-09 16:43:00" },
      ];
      setBatteries(mockBatteries);
    } catch (error) {
      console.error('Failed to load battery data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "charging": return <BatteryCharging className="w-5 h-5 text-green-500" />;
      case "discharging": return <Battery className="w-5 h-5 text-orange-500" />;
      case "standby": return <BatteryLow className="w-5 h-5 text-gray-500" />;
      default: return null;
    }
  };

  const totalCapacity = batteries.reduce((sum, b) => sum + b.capacity, 0);
  const totalCharge = batteries.reduce((sum, b) => sum + b.current_charge, 0);
  const avgHealth = batteries.reduce((sum, b) => sum + b.health, 0) / batteries.length;

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
              <Battery className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Capacity</p>
              <p className="text-xl font-bold">{totalCapacity} MWh</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Charge</p>
              <p className="text-xl font-bold">{totalCharge} MWh</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Utilization</p>
              <p className="text-xl font-bold">{((totalCharge / totalCapacity) * 100).toFixed(1)}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Health</p>
              <p className="text-xl font-bold">{avgHealth.toFixed(0)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Battery Storage Units</CardTitle>
          <CardDescription>Individual battery status and control</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {batteries.map((battery) => (
              <div key={battery.id} className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(battery.status)}
                    <div>
                      <p className="font-medium">{battery.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {battery.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Health</p>
                      <p className={`font-bold ${battery.health >= 95 ? 'text-green-500' : battery.health >= 90 ? 'text-orange-500' : 'text-red-500'}`}>
                        {battery.health}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        battery.status === 'charging' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                        battery.status === 'discharging' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 
                        'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {battery.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Charge Level</span>
                      <span className="text-sm font-medium">{battery.current_charge} / {battery.capacity} MWh</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${battery.current_charge / battery.capacity > 0.7 ? 'bg-green-500' : battery.current_charge / battery.capacity > 0.3 ? 'bg-blue-500' : 'bg-red-500'}`}
                        style={{ width: `${(battery.current_charge / battery.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Discharge</Button>
                    <Button size="sm" variant="outline">Charge</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
