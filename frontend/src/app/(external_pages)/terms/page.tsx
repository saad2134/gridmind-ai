import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Terms of Service - GridMind AI",
  description: "Read the terms and conditions governing your use of GridMind AI's platform and services",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">
          Last updated: April 9, 2026
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using GridMind AI's autonomous decision intelligence platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            GridMind AI provides an autonomous AI-powered platform for smart energy grid management, including demand forecasting, renewable integration optimization, battery storage optimization, and real-time decision-making capabilities. We reserve the right to modify, suspend, or discontinue any part of the service at any time.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To access certain features of our platform, you must create an account. You agree to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Keep your password secure and confidential</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You agree not to use the platform to:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>Violate any applicable laws, regulations, or third-party rights</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Use the service for any unlawful or fraudulent purpose</li>
            <li>Interfere with or disrupt the platform or servers connected to it</li>
            <li>Transmit any viruses, malware, or other malicious code</li>
            <li>Harvest or collect information about other users without consent</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            The platform, including all content, features, and functionality, is owned by GridMind AI and is protected by copyright, trademark, and other intellectual property laws. You retain ownership of any data you provide to the platform. We claim no ownership rights over your data, but you grant us a license to use it as necessary to provide our services.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Service Levels</h2>
          <p className="text-muted-foreground leading-relaxed">
            We strive to maintain high availability of our platform, but we do not guarantee uninterrupted access. We may perform scheduled maintenance or updates, and will make reasonable efforts to provide advance notice when possible. Our service levels are governed by any separate Service Level Agreement (SLA) you may have with us.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Fees and Payment</h2>
          <p className="text-muted-foreground leading-relaxed">
            Access to certain features of the platform may require payment of fees. All fees are stated in U.S. dollars unless otherwise specified. Payments are non-refundable unless otherwise stated in a separate agreement. We reserve the right to change our fees with 30 days advance notice.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Data and AI Predictions</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You acknowledge that:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
            <li>AI predictions and recommendations are based on historical data and algorithms</li>
            <li>Results may vary and should not be the sole basis for critical decisions</li>
            <li>You are responsible for validating outputs before implementation</li>
            <li>We make no warranties regarding prediction accuracy or outcomes</li>
          </ul>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            To the fullest extent permitted by law, GridMind AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the platform.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree to defend, indemnify, and hold harmless GridMind AI and its affiliates, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of the platform.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may terminate or suspend your access to the platform immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use the platform will cease immediately.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within [Your Jurisdiction].
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the updated Terms on this page with a new "Last updated" date. Your continued use of the platform after such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you have any questions about these Terms, please contact us:
          </p>
          <div className="mt-4 p-4 rounded-lg bg-muted/50 border">
            <p className="text-foreground font-medium">GridMind AI</p>
            <p className="text-muted-foreground">[Company Address]</p>
            <p className="text-muted-foreground">[City, State ZIP]</p>
            <p className="text-muted-foreground">Email: legal@gridmindai.com</p>
          </div>
        </section>
      </div>

      <div className="mt-12">
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
