"use client"

import { useEffect, useState } from "react"
import { api, PowerSourcesResponse } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from "recharts"
import { 
  Zap, Sun, Wind, Battery, RefreshCw, Droplets, Leaf
} from "lucide-react"

const renewableSources = ['solar', 'wind', 'hydro']

const mockRenewableHistory = [
  { hour: "00:00", solar: 0, wind: 1.8, hydro: 4.5 },
  { hour: "04:00", solar: 0, wind: 2.1, hydro: 4.8 },
  { hour: "08:00", solar: 0.5, wind: 1.9, hydro: 5.0 },
  { hour: "12:00", solar: 4.2, wind: 1.6, hydro: 5.2 },
  { hour: "16:00", solar: 2.8, wind: 1.8, hydro: 5.1 },
  { hour: "20:00", solar: 0.2, wind: 2.0, hydro: 4.9 },
  { hour: "24:00", solar: 0, wind: 1.7, hydro: 4.6 },
]

export default function RenewablePage() {
  const [powerSources, setPowerSources] = useState<PowerSourcesResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const sources = await api.getPowerSources()
      setPowerSources(sources)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const renewableData = powerSources ? Object.entries(powerSources.power_sources)
    .filter(([key, source]) => source.type === 'renewable')
    .map(([key, source]) => ({
      key,
      name: source.name,
      capacity: source.capacity,
      output: source.current_output,
      color: source.color,
      utilization: (source.current_output / source.capacity) * 100,
    })) : []

  const nonRenewableData = powerSources ? Object.entries(powerSources.power_sources)
    .filter(([key, source]) => source.type === 'non_renewable')
    .map(([key, source]) => ({
      key,
      name: source.name,
      capacity: source.capacity,
      output: source.current_output,
      color: source.color,
      utilization: (source.current_output / source.capacity) * 100,
    })) : []

  const pieData = renewableData.map(d => ({
    name: d.name,
    value: d.output,
    color: d.color,
  }))

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
          { icon: <Leaf className="w-5 h-5" />, label: "Renewable Output", value: `${powerSources?.summary.current_renewable_output || 9.4} MW`, color: "text-green-500" },
          { icon: <Zap className="w-5 h-5" />, label: "Non-Renewable Output", value: `${powerSources?.summary.current_non_renewable_output || 16.4} MW`, color: "text-gray-500" },
          { icon: <Battery className="w-5 h-5" />, label: "Renewable %", value: `${powerSources?.summary.renewable_percentage || 36.5}%`, color: "text-green-500" },
          { icon: <Leaf className="w-5 h-5" />, label: "Total Capacity", value: `${powerSources?.summary.total_capacity || 39} MW`, color: "text-blue-500" },
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
            <CardTitle>Renewable Generation</CardTitle>
            <CardDescription>Solar, Wind, and Hydro output</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockRenewableHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Line type="monotone" dataKey="solar" stroke="#F59E0B" strokeWidth={2} name="Solar" />
                <Line type="monotone" dataKey="wind" stroke="#3B82F6" strokeWidth={2} name="Wind" />
                <Line type="monotone" dataKey="hydro" stroke="#06B6D4" strokeWidth={2} name="Hydro" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Renewable Distribution</CardTitle>
            <CardDescription>Output breakdown by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value} MW`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Renewable Energy Sources</CardTitle>
          <CardDescription>Solar, Wind, and Hydro power details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renewableData.map((source) => (
              <div 
                key={source.key}
                className="p-6 rounded-lg border"
                style={{ borderTopColor: source.color, borderTopWidth: 4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  {source.key === 'solar' && <Sun className="w-8 h-8" style={{ color: source.color }} />}
                  {source.key === 'wind' && <Wind className="w-8 h-8" style={{ color: source.color }} />}
                  {source.key === 'hydro' && <Droplets className="w-8 h-8" style={{ color: source.color }} />}
                  <div>
                    <p className="text-xl font-bold">{source.name}</p>
                    <p className="text-sm text-muted-foreground">Renewable</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="text-lg font-semibold">{source.capacity} MW</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Output</p>
                    <p className="text-lg font-semibold" style={{ color: source.color }}>{source.output} MW</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className="font-medium">{source.utilization.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${source.utilization}%`,
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

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Non-Renewable Energy Sources</CardTitle>
          <CardDescription>Traditional power generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nonRenewableData.map((source) => (
              <div 
                key={source.key}
                className="p-6 rounded-lg border"
                style={{ borderTopColor: source.color, borderTopWidth: 4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${source.color}20` }}
                  >
                    <Zap className="w-5 h-5" style={{ color: source.color }} />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{source.name}</p>
                    <p className="text-sm text-muted-foreground">Non-Renewable</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="text-lg font-semibold">{source.capacity} MW</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Output</p>
                    <p className="text-lg font-semibold" style={{ color: source.color }}>{source.output} MW</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Utilization</span>
                    <span className="font-medium">{source.utilization.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${source.utilization}%`,
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
