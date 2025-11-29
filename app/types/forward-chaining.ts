// Type definitions for Forward Chaining Expert System

export interface Fact {
  id: string;
  value: string;
  description?: string;
}

export interface Rule {
  id: string;
  conditions: string[]; // Array of fact IDs
  conclusion: string; // Fact ID
  description: string;
  fired?: boolean;
}

export interface KnowledgeBase {
  facts: Fact[];
  rules: Rule[];
}

export interface InferenceStep {
  stepNumber: number;
  firedRule: Rule;
  newFact: Fact;
  currentFacts: string[];
  timestamp: number;
}

export interface InferenceResult {
  success: boolean;
  steps: InferenceStep[];
  finalFacts: string[];
  goal?: string;
  goalReached: boolean;
  message: string;
}

export interface DemoCase {
  id: string;
  title: string;
  description: string;
  category: string;
  initialFacts: Fact[];
  rules: Rule[];
  goal?: string;
}
