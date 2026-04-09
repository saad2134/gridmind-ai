'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, Download, Calendar, BarChart3, Shield, Activity, Users, CheckCircle
} from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { 
      id: 1,
      title: "Quarterly Compliance Report", 
      description: "Comprehensive compliance status for Q1 2026",
      type: "Compliance",
      lastGenerated: "2026-04-01",
      status: "completed"
    },
    { 
      id: 2,
      title: "Grid Reliability Assessment", 
      description: "SAIDI, SAIFI, and CAIDI metrics for the quarter",
      type: "Reliability",
      lastGenerated: "2026-04-01",
      status: "completed"
    },
    { 
      id: 3,
      title: "Safety Incident Report", 
      description: "Summary of safety incidents and mitigations",
      type: "Safety",
      lastGenerated: "2026-03-28",
      status: "completed"
    },
    { 
      id: 4,
      title: "Environmental Impact Report", 
      description: "Carbon emissions and renewable integration metrics",
      type: "Environmental",
      lastGenerated: "2026-03-25",
      status: "completed"
    },
    { 
      id: 5,
      title: "Consumer Protection Report", 
      description: "Customer service metrics and complaint resolution",
      type: "Consumer",
      lastGenerated: "2026-03-20",
      status: "completed"
    },
    { 
      id: 6,
      title: "Infrastructure Assessment", 
      description: "Grid infrastructure status and upgrade requirements",
      type: "Infrastructure",
      lastGenerated: "2026-03-15",
      status: "completed"
    },
  ];

  const scheduledReports = [
    { name: "Monthly Compliance Summary", frequency: "Monthly", nextDue: "2026-05-01" },
    { name: "Quarterly Safety Report", frequency: "Quarterly", nextDue: "2026-07-01" },
    { name: "Annual Reliability Assessment", frequency: "Annually", nextDue: "2027-01-15" },
    { name: "Environmental Compliance", frequency: "Quarterly", nextDue: "2026-07-01" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-bold">24</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">This Quarter</p>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Submissions</p>
            <p className="text-2xl font-bold text-orange-500">2</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="bg-card/80 dark:bg-card/90 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg ${
                  report.type === 'Compliance' ? 'bg-blue-500/10 text-blue-500' :
                  report.type === 'Safety' ? 'bg-red-500/10 text-red-500' :
                  report.type === 'Environmental' ? 'bg-green-500/10 text-green-500' :
                  'bg-purple-500/10 text-purple-500'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-muted">{report.type}</span>
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>Generated: {report.lastGenerated}</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
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
          <CardDescription>Automatic regulatory reports</CardDescription>
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
                  <p className="text-sm">Due: {report.nextDue}</p>
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
