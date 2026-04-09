'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { api, PowerSourcesResponse, OperatorData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import { 
  Zap, Sun, Wind, Battery, Activity, RefreshCw, Gauge, Plug, AlertTriangle
} from "lucide-react";

const GridMap = dynamic(() => import('@/components/grid-map'), { ssr: false });

export default function MonitorPage() {
  const [powerSources, setPowerSources] = useState<PowerSourcesResponse | null>(null);
  const [operatorData, setOperatorData] = useState<OperatorData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [sources, opData] = await Promise.all([
        api.getPowerSources(),
        api.getOperatorData(),
      ]);
      setPowerSources(sources);
      setOperatorData(opData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const realtimeData = Array.from({ length: 20 }, (_, i) => ({
    time: new Date(Date.now() - (19 - i) * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    demand: 10 + Math.random() * 5,
    frequency: 60 + (Math.random() - 0.5) * 0.2,
    voltage: 230 + (Math.random() - 0.5) * 4,
  }));

  const gridStatus = operatorData?.grid_status || { frequency: 60.0, voltage: 230.0, battery_level: 85, ai_status: "online" };

  const statusCards = [
    { 
      icon: <Gauge className="w-5 h-5" />, 
      label: "Grid Frequency", 
      value: `${gridStatus.frequency.toFixed(1)} Hz`, 
      status: gridStatus.frequency >= 59.5 && gridStatus.frequency <= 60.5 ? "normal" : "warning",
      color: "text-green-500" 
    },
    { 
      icon: <Plug className="w-5 h-5" />, 
      label: "Grid Voltage", 
      value: `${gridStatus.voltage.toFixed(0)} V`, 
      status: gridStatus.voltage >= 225 && gridStatus.voltage <= 235 ? "normal" : "warning",
      color: "text-green-500" 
    },
    { 
      icon: <Battery className="w-5 h-5" />, 
      label: "Battery Level", 
      value: `${gridStatus.battery_level}%`, 
      status: gridStatus.battery_level > 50 ? "normal" : "warning",
      color: gridStatus.battery_level > 70 ? "text-green-500" : "text-orange-500"
    },
    { 
      icon: <Activity className="w-5 h-5" />, 
      label: "AI System", 
      value: gridStatus.ai_status, 
      status: gridStatus.ai_status === "online" ? "normal" : "error",
      color: "text-blue-500" 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusCards.map((status, i) => (
          <Card key={i} className={`bg-card/80 dark:bg-card/90 ${status.status === 'warning' ? 'border-l-4 border-l-orange-500' : status.status === 'error' ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-green-500'}`}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-muted ${status.color}`}>{status.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{status.label}</p>
                <p className="text-xl font-bold">{status.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Live Demand & Frequency</CardTitle>
            <CardDescription>Real-time grid metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[59.5, 60.5]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="demand" stroke="#3B82F6" strokeWidth={2} name="Demand (MW)" />
                <Line yAxisId="right" type="monotone" dataKey="frequency" stroke="#10B981" strokeWidth={2} name="Frequency (Hz)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Power Sources</CardTitle>
            <CardDescription>Current generation by source</CardDescription>
          </CardHeader>
          <CardContent>
            {powerSources ? (
              <div className="space-y-4">
                {Object.entries(powerSources.power_sources).map(([key, source]) => (
                  <div key={key} className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }} />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{source.name}</span>
                        <span>{source.current_output} / {source.capacity} {source.unit}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ width: `${(source.current_output / source.capacity) * 100}%`, backgroundColor: source.color }}
                        />
                      </div>
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
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Grid Map
          </CardTitle>
          <CardDescription>Visual representation of grid infrastructure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] rounded-lg overflow-hidden">
            <GridMap />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
