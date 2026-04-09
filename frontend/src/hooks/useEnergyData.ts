import { useState, useCallback } from "react";
import { api, PredictionInput, DecisionResult, ExplainResult, SampleData } from "@/lib/api";

interface UseEnergyDataReturn {
  inputData: PredictionInput;
  decision: DecisionResult | null;
  explanation: ExplainResult | null;
  sampleData: SampleData | null;
  loading: boolean;
  error: string | null;
  updateInput: (field: keyof PredictionInput, value: number) => void;
  refreshData: () => Promise<void>;
  simulate: () => Promise<void>;
}

export function useEnergyData() {
  const [inputData, setInputData] = useState<PredictionInput>({
    hour: new Date().getHours(),
    day_of_week: new Date().getDay(),
    temperature: 28,
    solar_output: 2.5,
    current_load: 10,
  });

  const [decision, setDecision] = useState<DecisionResult | null>(null);
  const [explanation, setExplanation] = useState<ExplainResult | null>(null);
  const [sampleData, setSampleData] = useState<SampleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateInput = useCallback((field: keyof PredictionInput, value: number) => {
    setInputData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [decisionData, explainData, sample] = await Promise.all([
        api.getDecision(inputData),
        api.getExplain(),
        api.getSampleData(),
      ]);
      setDecision(decisionData);
      setExplanation(explainData);
      setSampleData(sample);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [inputData]);

  const simulate = useCallback(async () => {
    try {
      const result = await api.getDecision(inputData);
      setDecision(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Simulation failed");
    }
  }, [inputData]);

  return {
    inputData,
    decision,
    explanation,
    sampleData,
    loading,
    error,
    updateInput,
    refreshData,
    simulate,
  };
}