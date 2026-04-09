"use client"

import { useEffect, useState } from "react"
import { api, PowerSourcesResponse, SampleData, DecisionResult } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts"
import { 
  Zap, Sun, Wind, Battery, Activity, RefreshCw, Gauge, Voltage
} from "lucide-react"

const mockRealtimeData = Array.from({ length: 20 }, (_, i) => ({
  time: new Date(Date.now() - (19 - i) * 60000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  demand: 10 + Math.random() * 5,
  supply: 10 + Math.random() * 5,
  frequency: 60 + (Math.random() - 0.5) * 0.2,
}))

export default function MonitorPage() {
  const [powerSources, setPowerSources] = useState<PowerSourcesResponse | null>(null)
  const [sampleData, setSampleData] = useState<SampleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [realtimeData, setRealtimeData] = useState(mockRealtimeData)

  useEffect(() => {
    loadData()
    const interval = setInterval(() => {
      setRealtimeData(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          demand: 10 + Math.random() * 5,
          supply: 10 + Math.random() * 5,
          frequency: 60 + (Math.random() - 0.5) * 0.2,
        }
        return [...prev.slice(1), newPoint]
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [sources, sample] = await Promise.all([
        api.getPowerSources(),
        api.getSampleData(),
      ])
      setPowerSources(sources)
      setSampleData(sample)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalSupply = powerSources?.summary.current_total_output || 25.8
  const totalDemand = sampleData?.grid_stats.total_demand || 25.8
  const balance = totalSupply - totalDemand

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
          { icon: <Zap className="w-5 h-5" />, label: "Total Demand", value: `${totalDemand.toFixed(1)} MW`, color: balance >= 0 ? "text-green-500" : "text-red-500" },
          { icon: <Battery className="w-5 h-5" />, label: "Total Supply", value: `${totalSupply.toFixed(1)} MW`, color: "text-blue-500" },
          { icon: balance >= 0 ? <Activity className="w-5 h-5" /> : <Activity className="w-5 h-5" />, label: "Grid Balance", value: `${balance >= 0 ? '+' : ''}${balance.toFixed(1)} MW`, color: balance >= 0 ? "text-green-500" : "text-red-500" },
          { icon: <Gauge className="w-5 h-5" />, label: "Frequency", value: `${sampleData?.grid_stats.grid_frequency || 60.0} Hz`, color: "text-purple-500" },
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
            <CardTitle>Real-Time Demand vs Supply</CardTitle>
            <CardDescription>Live grid monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[8, 18]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Area type="monotone" dataKey="demand" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.2} name="Demand" />
                <Area type="monotone" dataKey="supply" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} name="Supply" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Grid Frequency</CardTitle>
            <CardDescription>Real-time frequency monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[59.5, 60.5]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Line type="monotone" dataKey="frequency" stroke="#8B5CF6" strokeWidth={2} name="Frequency (Hz)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Live Power Sources</CardTitle>
          <CardDescription>Real-time output from all sources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {powerSources && Object.entries(powerSources.power_sources).map(([key, source]) => (
              <div key={key} className="p-4 rounded-lg border text-center">
                <div 
                  className="w-3 h-3 rounded-full mx-auto mb-2 animate-pulse"
                  style={{ backgroundColor: source.color }}
                />
                <p className="font-semibold text-sm">{source.name}</p>
                <p className="text-lg font-bold" style={{ color: source.color }}>
                  {source.current_output}
                </p>
                <p className="text-xs text-muted-foreground">{source.unit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
