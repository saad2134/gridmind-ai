"use client"

import { useEffect, useState } from "react"
import { api, DecisionResult, ExplainResult, PowerSourcesResponse } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"
import { 
  Zap, Battery, Activity, RefreshCw, Target, Brain, Lightbulb, Clock, CheckCircle, AlertTriangle
} from "lucide-react"

const mockDecisionHistory = [
  { id: 1, timestamp: "18:00", action: "battery_discharge", amount: 3, unit: "MW", reason: "Peak demand predicted", status: "executed" },
  { id: 2, timestamp: "17:30", action: "charge_storage", amount: 1.5, unit: "MW", reason: "High solar output", status: "executed" },
  { id: 3, timestamp: "17:00", action: "reduce_noncritical_load", amount: 2, unit: "MW", reason: "Demand spike forecast", status: "executed" },
  { id: 4, timestamp: "16:00", action: "maintain", amount: 0, unit: "MW", reason: "Grid stable", status: "executed" },
  { id: 5, timestamp: "15:00", action: "charge_storage", amount: 2, unit: "MW", reason: "Excess solar generation", status: "executed" },
]

const actionColors: Record<string, string> = {
  battery_discharge: "text-green-500",
  charge_storage: "text-blue-500",
  reduce_noncritical_load: "text-orange-500",
  maintain: "text-muted-foreground",
}

const actionIcons: Record<string, React.ReactNode> = {
  battery_discharge: <Battery className="w-5 h-5" />,
  charge_storage: <Battery className="w-5 h-5" />,
  reduce_noncritical_load: <Activity className="w-5 h-5" />,
  maintain: <Zap className="w-5 h-5" />,
}

export default function DecisionsPage() {
  const [decision, setDecision] = useState<DecisionResult | null>(null)
  const [explanation, setExplanation] = useState<ExplainResult | null>(null)
  const [powerSources, setPowerSources] = useState<PowerSourcesResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const inputData = {
        hour: new Date().getHours(),
        day_of_week: new Date().getDay(),
        temperature: 28,
        solar_output: 2.5,
        current_load: 10,
      }
      const [decisionData, explainData, sources] = await Promise.all([
        api.getDecision(inputData),
        api.getExplain(),
        api.getPowerSources(),
      ])
      setDecision(decisionData)
      setExplanation(explainData)
      setPowerSources(sources)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const featureData = explanation ? Object.entries(explanation.feature_importance).map(([name, value]) => ({
    name: name.replace('_', ' '),
    value: value,
  })) : []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-end">
        <Button onClick={loadData} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: <Brain className="w-5 h-5" />, label: "Total Decisions", value: `${mockDecisionHistory.length}`, color: "text-primary" },
          { icon: <CheckCircle className="w-5 h-5" />, label: "Executed", value: `${mockDecisionHistory.filter(d => d.status === 'executed').length}`, color: "text-green-500" },
          { icon: <AlertTriangle className="w-5 h-5" />, label: "Pending", value: "0", color: "text-orange-500" },
          { icon: <Target className="w-5 h-5" />, label: "Accuracy", value: "94%", color: "text-blue-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-card/80 dark:bg-card/90">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>{stat.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              Latest AI Decision
            </CardTitle>
            <CardDescription>Current recommended action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {decision ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-6 rounded-lg bg-muted">
                  <div className={`p-3 rounded-full bg-background ${actionColors[decision.decision.action]}`}>
                    {actionIcons[decision.decision.action]}
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{formatAction(decision.decision.action)}</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                      {decision.decision.amount} {decision.decision.unit}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Reasoning:</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{decision.decision.reason}</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Predicted Demand: <span className="font-medium text-foreground">{decision.predicted_demand} MW</span></p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Loading decision...</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              AI Explanation
            </CardTitle>
            <CardDescription>Feature importance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            {explanation ? (
              <ResponsiveContainer width="100%" height={280}>
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
              <div className="h-[280px] flex items-center justify-center text-muted-foreground">Loading...</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Decision History</CardTitle>
          <CardDescription>Recent AI decisions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDecisionHistory.map((decision) => (
              <div 
                key={decision.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-muted ${actionColors[decision.action]}`}>
                    {actionIcons[decision.action]}
                  </div>
                  <div>
                    <p className="font-medium">{formatAction(decision.action)}</p>
                    <p className="text-sm text-muted-foreground">{decision.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{decision.amount} {decision.unit}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {decision.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Decision Metrics</CardTitle>
          <CardDescription>AI performance and accuracy over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border text-center">
              <p className="text-3xl font-bold text-green-500">94%</p>
              <p className="text-sm text-muted-foreground">Decision Accuracy</p>
            </div>
            <div className="p-4 rounded-lg border text-center">
              <p className="text-3xl font-bold text-blue-500">12ms</p>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </div>
            <div className="p-4 rounded-lg border text-center">
              <p className="text-3xl font-bold text-purple-500">98%</p>
              <p className="text-sm text-muted-foreground">Explainability Score</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
