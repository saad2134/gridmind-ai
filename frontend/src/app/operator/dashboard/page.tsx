'use client';

import { useEffect, useState } from "react";
import { api, PredictionInput, DecisionResult, ExplainResult, PowerSourcesResponse, OperatorData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { 
  Zap, Sun, Wind, Battery, Activity, AlertTriangle, RefreshCw, TrendingUp, CheckCircle, Droplets, Atom, Factory, Flame
} from "lucide-react";

const powerTypeIcons: Record<string, React.ReactNode> = {
  solar: <Sun className="w-4 h-4" />,
  wind: <Wind className="w-4 h-4" />,
  hydro: <Droplets className="w-4 h-4" />,
  nuclear: <Atom className="w-4 h-4" />,
  coal: <Factory className="w-4 h-4" />,
  gas: <Flame className="w-4 h-4" />,
};

const actionIcons: Record<string, React.ReactNode> = {
  battery_discharge: <Battery className="w-5 h-5" />,
  charge_storage: <Battery className="w-5 h-5" />,
  reduce_noncritical_load: <Activity className="w-5 h-5" />,
  maintain: <Zap className="w-5 h-5" />,
};

const actionColors: Record<string, string> = {
  battery_discharge: "text-green-500",
  charge_storage: "text-blue-500",
  reduce_noncritical_load: "text-orange-500",
  maintain: "text-muted-foreground",
};

export default function OperatorDashboardPage() {
  const [inputData, setInputData] = useState<PredictionInput>({
    hour: new Date().getHours(),
    day_of_week: new Date().getDay(),
    temperature: 28,
    solar_output: 2.5,
    current_load: 10,
  });

  const [decision, setDecision] = useState<DecisionResult | null>(null);
  const [explanation, setExplanation] = useState<ExplainResult | null>(null);
  const [powerSources, setPowerSources] = useState<PowerSourcesResponse | null>(null);
  const [operatorData, setOperatorData] = useState<OperatorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [decisionData, explainData, sources, opData] = await Promise.all([
        api.getDecision(inputData),
        api.getExplain(),
        api.getPowerSources(),
        api.getOperatorData(),
      ]);
      setDecision(decisionData);
      setExplanation(explainData);
      setPowerSources(sources);
      setOperatorData(opData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulate = async () => {
    setSimulating(true);
    try {
      const result = await api.getDecision(inputData);
      setDecision(result);
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setSimulating(false);
    }
  };

  const handleInputChange = (field: keyof PredictionInput, value: number) => {
    setInputData(prev => ({ ...prev, [field]: value }));
  };

  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const featureData = explanation ? Object.entries(explanation.feature_importance).map(([name, value]) => ({
    name: name.replace('_', ' '),
    value: value,
  })) : [];

  const statusIndicators = [
    { label: "Grid Frequency", value: "60.0 Hz", status: "normal", icon: <Activity className="w-4 h-4" /> },
    { label: "Grid Voltage", value: "230 V", status: "normal", icon: <Zap className="w-4 h-4" /> },
    { label: "Battery Status", value: "85%", status: "normal", icon: <Battery className="w-4 h-4" /> },
    { label: "AI System", value: "Online", status: "normal", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statusIndicators.map((status, i) => (
          <Card key={i} className={`bg-card/80 dark:bg-card/90 ${status.status === 'normal' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded-lg ${status.status === 'normal' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {status.icon}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{status.label}</p>
                <p className="text-xl font-bold">{status.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {powerSources && Object.entries(powerSources.power_sources).map(([key, source]) => (
          <Card key={key} className="bg-card/80 dark:bg-card/90">
            <CardContent className="p-3 flex items-center gap-2">
              <div style={{ color: source.color }}>{powerTypeIcons[key]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate">{source.name}</p>
                <p className="text-sm font-bold">{source.current_output} {source.unit}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Energy Demand Forecast</CardTitle>
            <CardDescription>Next 5 hours prediction</CardDescription>
          </CardHeader>
          <CardContent>
            {operatorData ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={operatorData.demand_forecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                  />
                  <Line type="monotone" dataKey="demand" stroke="var(--primary)" strokeWidth={2} dot={{ fill: 'var(--primary)' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-green-500" />
              AI Decision
            </CardTitle>
            <CardDescription>Recommended action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {decision ? (
              <>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted">
                  <span className={actionColors[decision.decision.action] || "text-gray-400"}>
                    {actionIcons[decision.decision.action]}
                  </span>
                  <div>
                    <p className="font-semibold">{formatAction(decision.decision.action)}</p>
                    <p className="text-sm text-muted-foreground">{decision.decision.amount} {decision.decision.unit}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{decision.decision.reason}</p>
              </>
            ) : (
              <p className="text-muted-foreground">Loading decision...</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              AI Explanation
            </CardTitle>
            <CardDescription>Feature importance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            {explanation ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={featureData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                  />
                  <Bar dataKey="value" fill="var(--primary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Scenario Simulator</CardTitle>
            <CardDescription>Adjust parameters and simulate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Temperature (°C)", key: "temperature", min: 15, max: 40 },
                { label: "Solar Output (MW)", key: "solar_output", min: 0, max: 5 },
                { label: "Current Load (MW)", key: "current_load", min: 3, max: 20 },
                { label: "Hour of Day", key: "hour", min: 0, max: 23 },
              ].map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="text-sm text-muted-foreground">{field.label}</label>
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    value={inputData[field.key as keyof PredictionInput]}
                    onChange={(e) => handleInputChange(field.key as keyof PredictionInput, parseInt(e.target.value))}
                    className="w-full accent-primary"
                  />
                  <p className="text-sm font-medium">{inputData[field.key as keyof PredictionInput]}</p>
                </div>
              ))}
            </div>
            <Button 
              onClick={handleSimulate} 
              className="w-full"
              disabled={simulating}
            >
              {simulating ? "Simulating..." : "Run Simulation"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
