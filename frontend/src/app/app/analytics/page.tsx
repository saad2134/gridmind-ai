"use client"

import { useEffect, useState } from "react"
import { api, PowerSourcesResponse, SampleData } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar 
} from "recharts"
import { 
  Zap, Sun, Wind, Battery, Activity, RefreshCw, Droplets, Atom, Factory, Flame
} from "lucide-react"

const powerTypeIcons: Record<string, React.ReactNode> = {
  solar: <Sun className="w-5 h-5" />,
  wind: <Wind className="w-5 h-5" />,
  hydro: <Droplets className="w-5 h-5" />,
  nuclear: <Atom className="w-5 h-5" />,
  coal: <Factory className="w-5 h-5" />,
  gas: <Flame className="w-5 h-5" />,
}

const mockHistoricalData = [
  { hour: "00:00", demand: 8.2, solar: 0, wind: 1.5 },
  { hour: "04:00", demand: 7.1, solar: 0, wind: 1.8 },
  { hour: "08:00", demand: 10.5, solar: 0.8, wind: 2.1 },
  { hour: "12:00", demand: 14.2, solar: 3.2, wind: 1.9 },
  { hour: "16:00", demand: 15.8, solar: 2.1, wind: 1.6 },
  { hour: "20:00", demand: 13.5, solar: 0.3, wind: 1.8 },
  { hour: "24:00", demand: 9.2, solar: 0, wind: 1.5 },
]

const mockWeeklyData = [
  { day: "Mon", demand: 245, efficiency: 92 },
  { day: "Tue", demand: 258, efficiency: 89 },
  { day: "Wed", demand: 267, efficiency: 91 },
  { day: "Thu", demand: 254, efficiency: 94 },
  { day: "Fri", demand: 271, efficiency: 88 },
  { day: "Sat", demand: 198, efficiency: 96 },
  { day: "Sun", demand: 182, efficiency: 97 },
]

export default function AnalyticsPage() {
  const [powerSources, setPowerSources] = useState<PowerSourcesResponse | null>(null)
  const [sampleData, setSampleData] = useState<SampleData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
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

  const getPieData = () => {
    if (!powerSources) return []
    return Object.entries(powerSources.power_sources).map(([key, source]) => ({
      name: source.name,
      value: source.current_output,
      color: source.color,
      type: source.type,
    }))
  }

  const getCapacityData = () => {
    if (!powerSources) return []
    return Object.entries(powerSources.power_sources).map(([key, source]) => ({
      name: source.name,
      capacity: source.capacity,
      utilization: (source.current_output / source.capacity) * 100,
    }))
  }

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
          { icon: <Zap className="w-5 h-5" />, label: "Total Demand", value: `${sampleData?.grid_stats?.total_demand || 25.8} MW`, color: "text-primary" },
          { icon: <Sun className="w-5 h-5" />, label: "Renewable Output", value: `${powerSources?.summary.current_renewable_output || 9.4} MW`, color: "text-green-500" },
          { icon: <Activity className="w-5 h-5" />, label: "Renewable %", value: `${powerSources?.summary.renewable_percentage || 36.5}%`, color: "text-blue-500" },
          { icon: <Battery className="w-5 h-5" />, label: "Total Capacity", value: `${powerSources?.summary.total_capacity || 39} MW`, color: "text-purple-500" },
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
            <CardTitle>Daily Energy Pattern</CardTitle>
            <CardDescription>24-hour demand and renewable generation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockHistoricalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Line type="monotone" dataKey="demand" stroke="var(--primary)" strokeWidth={2} name="Demand" />
                <Line type="monotone" dataKey="solar" stroke="#F59E0B" strokeWidth={2} name="Solar" />
                <Line type="monotone" dataKey="wind" stroke="#3B82F6" strokeWidth={2} name="Wind" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Power Source Distribution</CardTitle>
            <CardDescription>Current output by source type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getPieData()}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value} MW`}
                >
                  {getPieData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Weekly Demand</CardTitle>
            <CardDescription>Energy demand by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Bar dataKey="demand" fill="var(--primary)" name="Demand (MWh)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Capacity Utilization</CardTitle>
            <CardDescription>Current utilization by power source</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getCapacityData()} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Bar dataKey="utilization" name="Utilization %" fill="var(--primary)" radius={[0, 4, 4, 0]}>
                  {getCapacityData().map((entry, index) => {
                    const source = powerSources?.power_sources[entry.name.toLowerCase()]
                    return <Cell key={`cell-${index}`} fill={source?.color || 'var(--primary)'} />
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Power Source Details</CardTitle>
          <CardDescription>All power sources and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {powerSources && Object.entries(powerSources.power_sources).map(([key, source]) => (
              <div 
                key={key} 
                className="p-4 rounded-lg border"
                style={{ borderLeftColor: source.color, borderLeftWidth: 4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div style={{ color: source.color }}>
                    {powerTypeIcons[key]}
                  </div>
                  <div>
                    <p className="font-semibold">{source.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{source.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Capacity</p>
                    <p className="font-medium">{source.capacity} {source.unit}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Output</p>
                    <p className="font-medium">{source.current_output} {source.unit}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className="font-medium">{Math.round((source.current_output / source.capacity) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${(source.current_output / source.capacity) * 100}%`,
                        backgroundColor: source.color 
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
