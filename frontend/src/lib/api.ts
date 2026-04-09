const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface PredictionInput {
  hour: number
  day_of_week: number
  temperature: number
  solar_output: number
  current_load: number
}

export interface PredictionResult {
  predicted_demand: number
  unit: string
  timestamp: string
}

export interface DecisionResult {
  predicted_demand: number
  decision: {
    action: string
    amount: number
    unit: string
    reason: string
  }
  timestamp: string
}

export interface FeatureImportance {
  [key: string]: number
}

export interface ExplainResult {
  feature_importance: FeatureImportance
  explanations: Record<string, string>
  timestamp: string
}

export interface SimulationInput {
  temperature: number
  solar_output: number
  current_load: number
  hour: number
  day_of_week: number
}

export interface SimulationResult {
  predicted_demand: number
  decision: {
    action: string
    amount: number
    unit: string
    reason: string
  }
  scenario: SimulationInput
}

export interface SampleData {
  current: {
    temperature: number
    hour: number
    solar_output: number
    current_load: number
    day_of_week: number
  }
  predictions: Array<{ hour: number; demand: number }>
  renewable: {
    solar: number
    wind: number
  }
  power_sources: {
    [key: string]: PowerSource
  }
  grid_stats: {
    total_demand: number
    total_supply: number
    renewable_percentage: number
    grid_frequency: number
    grid_voltage: number
  }
}

export interface PowerSource {
  name: string
  capacity: number
  current_output: number
  unit: string
  type: 'renewable' | 'non_renewable'
  color: string
}

export interface PowerSourcesResponse {
  power_sources: {
    [key: string]: PowerSource
  }
  summary: {
    total_renewable_capacity: number
    total_non_renewable_capacity: number
    total_capacity: number
    current_renewable_output: number
    current_non_renewable_output: number
    current_total_output: number
    renewable_percentage: number
  }
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }
  
  return response.json()
}

export const api = {
  predict: (data: PredictionInput): Promise<PredictionResult> =>
    fetchAPI('/predict', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getDecision: (data: PredictionInput): Promise<DecisionResult> =>
    fetchAPI('/decision', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getExplain: (): Promise<ExplainResult> =>
    fetchAPI('/explain'),

  simulate: (data: SimulationInput): Promise<SimulationResult> =>
    fetchAPI('/simulate', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getSampleData: (): Promise<SampleData> =>
    fetchAPI('/data/sample'),

  getStatus: (): Promise<{ status: string; timestamp: string }> =>
    fetchAPI('/status'),

  getPowerSources: (): Promise<PowerSourcesResponse> =>
    fetchAPI('/data/power-sources'),
}