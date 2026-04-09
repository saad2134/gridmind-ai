'use client';

import { useEffect, useState } from "react";
import { api, ConsumerData } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, DollarSign, Calendar, RefreshCw, Download, FileText, Clock, TrendingDown
} from "lucide-react";

export default function BillingPage() {
  const [consumerData, setConsumerData] = useState<ConsumerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await api.getConsumerData();
      setConsumerData(data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const billingHistory = [
    { month: "March 2026", amount: 138, status: "paid" },
    { month: "February 2026", amount: 145, status: "paid" },
    { month: "January 2026", amount: 162, status: "paid" },
    { month: "December 2025", amount: 178, status: "paid" },
    { month: "November 2025", amount: 155, status: "paid" },
    { month: "October 2025", amount: 142, status: "paid" },
  ];

  const paymentMethods = [
    { type: "Credit Card", last4: "4242", expiry: "12/27", default: true },
    { type: "Bank Account", last4: "1234", expiry: "", default: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-xl font-bold">₹{consumerData?.billing.current_balance || 0}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="text-xl font-bold">{consumerData?.billing.due_date || "N/A"}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/80 dark:bg-card/90">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Savings</p>
              <p className="text-xl font-bold">₹{consumerData?.savings.amount || 0}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pay Your Bill</CardTitle>
              <CardDescription>Make a payment on your account</CardDescription>
            </div>
            <Button>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay Now
            </Button>
          </CardHeader>
          <CardContent>
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <p className="text-4xl font-bold mb-2">₹{consumerData?.billing.current_balance || 0}</p>
              <p className="text-muted-foreground mb-4">Due on {consumerData?.billing.due_date}</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Set Auto-Pay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 dark:bg-card/90">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((method, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{method.type} •••• {method.last4}</p>
                      {method.default && <span className="text-xs text-green-500">Default</span>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/80 dark:bg-card/90">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download past bills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billingHistory.map((bill, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{bill.month}</p>
                    <p className="text-sm text-muted-foreground">₹{bill.amount}.00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    {bill.status}
                  </span>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
