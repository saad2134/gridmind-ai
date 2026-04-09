import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
        <p className="text-muted-foreground">
          This Privacy Policy describes how GridMind AI collects, uses, and discloses your information when you use our platform.
        </p>
        <h2 className="text-2xl font-semibold">Data Collection</h2>
        <p className="text-muted-foreground">
          We collect data to provide better energy forecasting and decision-making services. This includes energy consumption patterns, grid metrics, and system performance data.
        </p>
        <h2 className="text-2xl font-semibold">Data Usage</h2>
        <p className="text-muted-foreground">
          Your data is used to train our AI models, improve prediction accuracy, and provide personalized recommendations for energy grid optimization.
        </p>
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-muted-foreground">
          If you have any questions about this Privacy Policy, please contact us.
        </p>
      </div>
      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}