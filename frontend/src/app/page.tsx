"use client"

import { useEffect, useState } from "react"
import { api, PredictionInput, DecisionResult, ExplainResult, SampleData } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts"
import { 
  Zap, Sun, Wind, Battery, Activity, Info, RefreshCw, TrendingUp 
} from "lucide-react"

const actionIcons: Record<string, React.ReactNode> = {
  battery_discharge: <Battery className="w-5 h-5" />,
  charge_storage: <Battery className="w-5 h-5" />,
  reduce_noncritical_load: <Activity className="w-5 h-5" />,
  maintain: <Zap className="w-5 h-5" />,
}

const actionColors: Record<string, string> = {
  battery_discharge: "text-green-500",
  charge_storage: "text-blue-500",
  reduce_noncritical_load: "text-orange-500",
  maintain: "text-gray-500",
}

export default function Dashboard() {
  const [inputData, setInputData] = useState<PredictionInput>({
    hour: new Date().getHours(),
    day_of_week: new Date().getDay(),
    temperature: 28,
    solar_output: 2.5,
    current_load: 10,
  })
  
  const [decision, setDecision] = useState<DecisionResult | null>(null)
  const [explanation, setExplanation] = useState<ExplainResult | null>(null)
  const [sampleData, setSampleData] = useState<SampleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [simulating, setSimulating] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [decisionData, explainData, sample] = await Promise.all([
        api.getDecision(inputData),
        api.getExplain(),
        api.getSampleData(),
      ])
      setDecision(decisionData)
      setExplanation(explainData)
      setSampleData(sample)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSimulate = async () => {
    setSimulating(true)
    try {
      const result = await api.getDecision(inputData)
      setDecision(result)
    } catch (error) {
      console.error('Simulation failed:', error)
    } finally {
      setSimulating(false)
    }
  }

  const handleInputChange = (field: keyof PredictionInput, value: number) => {
    setInputData(prev => ({ ...prev, [field]: value }))
  }

  const formatAction = (action: string) => {
    return action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  const featureData = explanation ? Object.entries(explanation.feature_importance).map(([name, value]) => ({
    name: name.replace('_', ' '),
    value: value,
  })) : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-400" />
              GridMind AI
            </h1>
            <p className="text-slate-400 mt-1">Autonomous Decision Intelligence for Smart Energy Networks</p>
          </div>
          <Button 
            onClick={loadData} 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: <Zap className="w-5 h-5" />, label: "Current Load", value: `${inputData.current_load} MW`, color: "text-yellow-400" },
            { icon: <Sun className="w-5 h-5" />, label: "Solar Output", value: `${inputData.solar_output} MW`, color: "text-orange-400" },
            { icon: <Wind className="w-5 h-5" />, label: "Wind Output", value: `${sampleData?.renewable.wind || 1.8} MW`, color: "text-blue-400" },
            { icon: <TrendingUp className="w-5 h-5" />, label: "Predicted Demand", value: `${decision?.predicted_demand || '--'} MW`, color: "text-green-400" },
          ].map((stat, i) => (
            <Card key={i} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-slate-700 ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Energy Demand Forecast</CardTitle>
              <CardDescription className="text-slate-400">Next 5 hours prediction</CardDescription>
            </CardHeader>
            <CardContent>
              {sampleData ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sampleData.predictions}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="hour" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="demand" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-slate-500">Loading chart...</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Battery className="w-5 h-5 text-green-400" />
                AI Decision
              </CardTitle>
              <CardDescription className="text-slate-400">Recommended action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {decision ? (
                <>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-700/50">
                    <span className={actionColors[decision.decision.action] || "text-gray-400"}>
                      {actionIcons[decision.decision.action]}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{formatAction(decision.decision.action)}</p>
                      <p className="text-sm text-slate-400">{decision.decision.amount} {decision.decision.unit}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{decision.decision.reason}</p>
                </>
              ) : (
                <p className="text-slate-500">Loading decision...</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                AI Explanation
              </CardTitle>
              <CardDescription className="text-slate-400">Feature importance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {explanation ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={featureData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" width={80} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-slate-500">Loading...</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Scenario Simulator</CardTitle>
              <CardDescription className="text-slate-400">Adjust parameters and simulate</CardDescription>
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
                    <label className="text-sm text-slate-400">{field.label}</label>
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      value={inputData[field.key as keyof PredictionInput]}
                      onChange={(e) => handleInputChange(field.key as keyof PredictionInput, parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <p className="text-sm text-white font-medium">{inputData[field.key as keyof PredictionInput]}</p>
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleSimulate} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={simulating}
              >
                {simulating ? "Simulating..." : "Run Simulation"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}