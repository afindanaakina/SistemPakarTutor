// Backward Chaining Types

export interface Goal {
  id: string;
  description: string;
  proven?: boolean;
}

export interface Query {
  goalId: string;
  depth: number;
  path: string[];
}

export interface BackwardInferenceStep {
  stepNumber: number;
  type: 'query' | 'fact_check' | 'rule_check' | 'proven' | 'failed';
  query: string;
  result?: string;
  subgoals?: string[];
  appliedRule?: string;
  depth: number;
  timestamp: number;
}

export interface BackwardInferenceResult {
  success: boolean;
  goalProven: boolean;
  steps: BackwardInferenceStep[];
  usedFacts: string[];
  usedRules: string[];
  message: string;
  proofTree?: ProofNode;
}

export interface ProofNode {
  goal: string;
  proven: boolean;
  rule?: string;
  children?: ProofNode[];
  facts?: string[];
}
