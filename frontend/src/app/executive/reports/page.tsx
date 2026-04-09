'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, Download, Calendar, BarChart3, PieChart, TrendingUp, Users, Zap, Activity
} from "lucide-react";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const reports = [
    { 
      id: 1,
      title: "Monthly Performance Report", 
      description: "Comprehensive analysis of grid performance, efficiency metrics, and operational summary",
      type: "Performance",
      lastGenerated: "2026-04-01",
      icon: <Activity className="w-5 h-5" />
    },
    { 
      id: 2,
      title: "Financial Summary", 
      description: "Revenue, expenses, profit margins, and ROI analysis for the reporting period",
      type: "Financial",
      lastGenerated: "2026-04-01",
      icon: <TrendingUp className="w-5 h-5" />
    },
    { 
      id: 3,
      title: "Energy Consumption Report", 
      description: "Detailed breakdown of energy consumption across all sectors and customer categories",
      type: "Operations",
      lastGenerated: "2026-04-01",
      icon: <Zap className="w-5 h-5" />
    },
    { 
      id: 4,
      title: "Customer Analytics", 
      description: "Usage patterns, demographics, and service adoption metrics across customer base",
      type: "Analytics",
      lastGenerated: "2026-03-28",
      icon: <Users className="w-5 h-5" />
    },
    { 
      id: 5,
      title: "Renewable Integration Report", 
      description: "Solar and wind energy contribution, storage utilization, and green energy metrics",
      type: "Sustainability",
      lastGenerated: "2026-03-25",
      icon: <PieChart className="w-5 h-5" />
    },
    { 
      id: 6,
      title: "Infrastructure Assessment", 
      description: "Grid infrastructure status, equipment health, and maintenance requirements",
      type: "Operations",
      lastGenerated: "2026-03-20",
      icon: <BarChart3 className="w-5 h-5" />
    },
  ];

  const scheduledReports = [
    { name: "Daily Operations Summary", frequency: "Daily", nextDue: "2026-04-10" },
    { name: "Weekly Performance Report", frequency: "Weekly", nextDue: "2026-04-13" },
    { name: "Monthly Financial Report", frequency: "Monthly", nextDue: "2026-05-01" },
    { name: "Quarterly Compliance Report", frequency: "Quarterly", nextDue: "2026-04-15" },
    { name: "Annual Strategic Report", frequency: "Annually", nextDue: "2027-01-01" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-2 mb-4">
        {["daily", "weekly", "monthly", "quarterly", "annual"].map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod(period)}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="bg-card/80 dark:bg-card/90 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${report.type === 'Financial' ? 'bg-green-500/10 text-green-500' : report.type === 'Performance' ? 'bg-blue-500/10 text-blue-500' : 'bg-purple-500/10 text-purple-500'}`}>
                  {report.icon}
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-muted">{report.type}</span>
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>Last generated: {report.lastGenerated}</span>
              </div>
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automatic reports scheduled for regular generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledReports.map((report, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">{report.frequency}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Next due: {report.nextDue}</p>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
