'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, Mail, Phone, Building2, Briefcase, Calendar, Award, MapPin, Globe, Edit2, Zap
} from "lucide-react";

export default function OperatorProfilePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-card/80 dark:bg-card/90">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground mb-4">
                OP
              </div>
              <h3 className="text-xl font-semibold">Grid Operator</h3>
              <p className="text-muted-foreground">Control Center</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4" />
                <span>Operations Team</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/80 dark:bg-card/90">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">Grid Operator</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">operator@gridemind.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 98765 43212</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Organization</p>
                  <p className="font-medium">GridMind AI India</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Briefcase className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">Grid Operator</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">February 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Work Information</CardTitle>
            <CardDescription>Professional details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Bengaluru, Karnataka</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">Operations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Operations Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Decisions Made</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground">Monitoring</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
