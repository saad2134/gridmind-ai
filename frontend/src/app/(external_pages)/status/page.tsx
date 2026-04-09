import { siteConfig } from "@/config/site";
import StatusPageClient from "./status-client";

export const metadata = {
  title: `Status ✦ ${siteConfig.name}`,
  description: "Monitor the status of various GridMind AI services.",
};

export default function StatusPage() {
  return <StatusPageClient />;
}
