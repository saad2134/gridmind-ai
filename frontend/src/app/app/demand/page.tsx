"use client"

import { useEffect, useState } from "react"
import { api, PredictionInput, DecisionResult, SampleData } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts"
import { 
  Zap, RefreshCw, TrendingUp, Calendar, Clock
} from "lucide-react"

const mockForecastData = Array.from({ length: 24 }, (_, i) => {
  const hour = i
  const baseDemand = 10 + Math.sin((hour - 6) * Math.PI / 12) * 5
  const peakMultiplier = (hour >= 17 && hour <= 21) ? 1.3 : 1
  return {
    hour: `${hour.toString().padStart(2, '0')}:00`,
    predicted: parseFloat((baseDemand * peakMultiplier + Math.random() * 2).toFixed(1)),
    actual: hour < new Date().getHours() ? parseFloat((baseDemand * peakMultiplier + Math.random()).toFixed(1)) : null,
  }
})

export default function DemandPage() {
  const [inputData, setInputData] = useState<PredictionInput>({
    hour: new Date().getHours(),
    day_of_week: new Date().getDay(),
    temperature: 28,
    solar_output: 2.5,
    current_load: 10,
  })
  
  const [decision, setDecision] = useState<DecisionResult | null>(null)
  const [sampleData, setSampleData] = useState<SampleData | null>(null)
  const [loading, setLoading] = useState(true)
  const [forecasting, setForecasting] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [decisionData, sample] = await Promise.all([
        api.getDecision(inputData),
        api.getSampleData(),
      ])
      setDecision(decisionData)
      setSampleData(sample)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleForecast = async () => {
    setForecasting(true)
    try {
      const result = await api.getDecision(inputData)
      setDecision(result)
    } catch (error) {
      console.error('Forecast failed:', error)
    } finally {
      setForecasting(false)
    }
  }

  const handleInputChange = (field: keyof PredictionInput, value: number) => {
    setInputData(prev => ({ ...prev, [field]: value }))
  }

  const currentHour = new Date().getHours()
  const forecastSummary = mockForecastData.slice(currentHour).reduce((acc, item) => {
    acc.peak = Math.max(acc.peak, item.predicted)
    acc.average = acc.average + item.predicted
    return acc
  }, { peak: 0, average: 0 })
  forecastSummary.average = forecastSummary.average / mockForecastData.slice(currentHour).length

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
          { icon: <Zap className="w-5 h-5" />, label: "Current Demand", value: `${inputData.current_load} MW`, color: "text-primary" },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Peak Forecast", value: `${forecastSummary.peak.toFixed(1)} MW`, color: "text-orange-500" },
          { icon: <TrendingUp className="w-5 h-5" />, label: "Avg Forecast", value: `${forecastSummary.average.toFixed(1)} MW`, color: "text-blue-500" },
          { icon: <Clock className="w-5 h-5" />, label: "Next Hour", value: `${decision?.predicted_demand || '--'} MW`, color: "text-green-500" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>24-Hour Demand Forecast</CardTitle>
            <CardDescription>Predicted demand with confidence interval</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={mockForecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis domain={[5, 25]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                />
                <Area type="monotone" dataKey="actual" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.3} name="Actual" />
                <Area type="monotone" dataKey="predicted" stroke="#F59E0B" fill="transparent" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Forecast Parameters</CardTitle>
            <CardDescription>Adjust inputs for prediction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Temperature (°C)</label>
              <input
                type="range"
                min={15}
                max={40}
                value={inputData.temperature}
                onChange={(e) => handleInputChange('temperature', parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm font-medium">{inputData.temperature}°C</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Hour of Day</label>
              <input
                type="range"
                min={0}
                max={23}
                value={inputData.hour}
                onChange={(e) => handleInputChange('hour', parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm font-medium">{inputData.hour}:00</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Solar Output (MW)</label>
              <input
                type="range"
                min={0}
                max={5}
                step={0.1}
                value={inputData.solar_output}
                onChange={(e) => handleInputChange('solar_output', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm font-medium">{inputData.solar_output} MW</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Current Load (MW)</label>
              <input
                type="range"
                min={3}
                max={20}
                value={inputData.current_load}
                onChange={(e) => handleInputChange('current_load', parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <p className="text-sm font-medium">{inputData.current_load} MW</p>
            </div>
            <Button 
              onClick={handleForecast} 
              className="w-full"
              disabled={forecasting}
            >
              {forecasting ? "Forecasting..." : "Run Forecast"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Hourly Breakdown</CardTitle>
          <CardDescription>Detailed forecast for the next 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {mockForecastData.slice(0, 24).map((item, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-lg border text-center ${
                  i === currentHour ? 'bg-primary/20 border-primary' : ''
                }`}
              >
                <p className="text-xs text-muted-foreground">{item.hour}</p>
                <p className="text-lg font-bold">{item.predicted}</p>
                <p className="text-xs text-muted-foreground">MW</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
