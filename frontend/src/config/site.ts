export const siteConfig = {
  name: "GridMind AI",
  version: "v1.0.0",
  url: "http://localhost:3000",
  getStartedUrl: "/",
  ogImage: "",
  tagline: "Autonomous Decision Engine for Smart Energy Grids",
  description: 
    "An AI-powered platform that predicts energy demand, optimizes grid decisions, and explains AI reasoning in real time for modern energy networks.",
  links: {
    twitter: "",
    github: "https://github.com/saad2134/smart-energy-grids",
    email: "",
    phone: "",
  },
};

export type SiteConfig = typeof siteConfig;

export const CORE_CONFIG = {
  appName: siteConfig.name,
  appDescription: siteConfig.description,
};

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  endpoints: {
    predict: "/predict",
    decision: "/decision",
    explain: "/explain",
    simulate: "/simulate",
    sampleData: "/data/sample",
    status: "/status",
  },
};

export const SOLAR_CONFIG = {
  minOutput: 0,
  maxOutput: 5,
  unit: "MW",
};

export const GRID_CONFIG = {
  demandThreshold: {
    high: 14,
    low: 8,
  },
  batteryCapacity: 20,
  gridCapacity: 50,
};

export const FEATURE_LABELS: Record<string, string> = {
  temperature: "Temperature",
  hour: "Time of Day",
  solar_output: "Solar Output",
  current_load: "Current Load",
  day_of_week: "Day of Week",
};

export const DECISION_ACTIONS = {
  BATTERY_DISCHARGE: "battery_discharge",
  CHARGE_STORAGE: "charge_storage",
  REDUCE_LOAD: "reduce_noncritical_load",
  MAINTAIN: "maintain",
};

export const SOCIAL_LINKS = siteConfig.links;