'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, Mail, Phone, Building2, Briefcase, Calendar, Award, MapPin, Globe, Edit2, Shield
} from "lucide-react";

export default function RegulatorProfilePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 bg-card/80 dark:bg-card/90">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-4xl font-bold text-primary-foreground mb-4">
                RG
              </div>
              <h3 className="text-xl font-semibold">Regulator</h3>
              <p className="text-muted-foreground">Compliance Officer</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Regulatory Authority</span>
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
                  <p className="font-medium">Regulator</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">regulator@gridemind.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+91 98765 43211</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Building2 className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Organization</p>
                  <p className="font-medium">Central Electricity Regulatory Commission</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Briefcase className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium">Compliance Officer</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">March 2024</p>
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
                  <p className="font-medium">New Delhi, NCT</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">Compliance Division</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Compliance Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">200+</p>
              <p className="text-sm text-muted-foreground">Audits Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">95%</p>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Reports Filed</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
