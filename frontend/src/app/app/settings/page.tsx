"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Settings as SettingsIcon, Globe, Database, Bell, Shield, Cpu, Save, RefreshCw, Power, Eye
} from "lucide-react"

export default function SettingsPage() {
  const [systemSettings, setSystemSettings] = useState({
    apiUrl: "http://localhost:8000",
    refreshInterval: 5,
    autoRefresh: true,
    darkMode: true,
  })

  const [aiSettings, setAiSettings] = useState({
    decisionMode: "auto",
    confidenceThreshold: 75,
    explainability: true,
    realTimeLearning: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    demandAlerts: true,
    gridAnomalies: true,
    systemErrors: true,
    emailReports: "daily",
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure system preferences and AI behavior</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Connection Settings
            </CardTitle>
            <CardDescription>Configure API and connection parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-url">API Base URL</Label>
              <Input 
                id="api-url" 
                value={systemSettings.apiUrl}
                onChange={(e) => setSystemSettings({...systemSettings, apiUrl: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Auto Refresh Interval (seconds)</Label>
              <Input 
                id="refresh-interval" 
                type="number"
                min={1}
                max={60}
                value={systemSettings.refreshInterval}
                onChange={(e) => setSystemSettings({...systemSettings, refreshInterval: parseInt(e.target.value)})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Auto Refresh</p>
                <p className="text-sm text-muted-foreground">Automatically refresh dashboard data</p>
              </div>
              <Switch 
                checked={systemSettings.autoRefresh}
                onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoRefresh: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme</p>
              </div>
              <Switch 
                checked={systemSettings.darkMode}
                onCheckedChange={(checked) => setSystemSettings({...systemSettings, darkMode: checked})}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              AI Decision Engine
            </CardTitle>
            <CardDescription>Configure AI behavior and thresholds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Decision Mode</Label>
              <Select 
                value={aiSettings.decisionMode}
                onValueChange={(value) => setAiSettings({...aiSettings, decisionMode: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Fully Autonomous</SelectItem>
                  <SelectItem value="advisory">Advisory (Recommended)</SelectItem>
                  <SelectItem value="manual">Manual Approval</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Confidence Threshold (%)</Label>
              <Input 
                type="number"
                min={50}
                max={100}
                value={aiSettings.confidenceThreshold}
                onChange={(e) => setAiSettings({...aiSettings, confidenceThreshold: parseInt(e.target.value)})}
              />
              <p className="text-xs text-muted-foreground">Minimum confidence required for autonomous decisions</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Explainability</p>
                <p className="text-sm text-muted-foreground">Show AI decision explanations</p>
              </div>
              <Switch 
                checked={aiSettings.explainability}
                onCheckedChange={(checked) => setAiSettings({...aiSettings, explainability: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Real-time Learning</p>
                <p className="text-sm text-muted-foreground">Enable continuous model improvement</p>
              </div>
              <Switch 
                checked={aiSettings.realTimeLearning}
                onCheckedChange={(checked) => setAiSettings({...aiSettings, realTimeLearning: checked})}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Alert Settings
            </CardTitle>
            <CardDescription>Configure system alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Demand Alerts</p>
                <p className="text-sm text-muted-foreground">Notify on high demand predictions</p>
              </div>
              <Switch 
                checked={notificationSettings.demandAlerts}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, demandAlerts: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Grid Anomalies</p>
                <p className="text-sm text-muted-foreground">Alert on unusual grid patterns</p>
              </div>
              <Switch 
                checked={notificationSettings.gridAnomalies}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, gridAnomalies: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Errors</p>
                <p className="text-sm text-muted-foreground">Critical system error notifications</p>
              </div>
              <Switch 
                checked={notificationSettings.systemErrors}
                onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemErrors: checked})}
              />
            </div>
            <div className="space-y-2">
              <Label>Email Reports</Label>
              <Select 
                value={notificationSettings.emailReports}
                onValueChange={(value) => setNotificationSettings({...notificationSettings, emailReports: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data Management
            </CardTitle>
            <CardDescription>Manage data storage and retention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Data Retention Period</Label>
              <Select defaultValue="90">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                  <SelectItem value="180">180 Days</SelectItem>
                  <SelectItem value="365">1 Year</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select defaultValue="csv">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear Cache
              </Button>
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View Logs
              </Button>
              <Button variant="destructive" className="w-full">
                <Power className="w-4 h-4 mr-2" />
                Reset All Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Current system status and version</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Version</p>
              <p className="text-lg font-semibold">1.0.0</p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">API Status</p>
              <p className="text-lg font-semibold text-green-500">Online</p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Last Sync</p>
              <p className="text-lg font-semibold">Just now</p>
            </div>
            <div className="p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">Uptime</p>
              <p className="text-lg font-semibold">99.9%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
