import { Fact, Rule } from '../types/forward-chaining';
import { BackwardInferenceStep, BackwardInferenceResult, ProofNode } from '../types/backward-chaining';

export class BackwardChainingEngine {
  private knownFacts: Set<string>;
  private rules: Rule[];
  private inferenceSteps: BackwardInferenceStep[];
  private stepCounter: number;
  private usedRules: Set<string>;
  private usedFacts: Set<string>;
  private maxDepth: number = 10;

  constructor() {
    this.knownFacts = new Set();
    this.rules = [];
    this.inferenceSteps = [];
    this.stepCounter = 0;
    this.usedRules = new Set();
    this.usedFacts = new Set();
  }

  public run(
    initialFacts: Fact[],
    rules: Rule[],
    goal: string
  ): BackwardInferenceResult {
    // Reset engine state
    this.knownFacts.clear();
    this.usedRules.clear();
    this.usedFacts.clear();
    this.inferenceSteps = [];
    this.stepCounter = 0;
    
    // Initialize known facts
    initialFacts.forEach(fact => this.knownFacts.add(fact.id));
    this.rules = [...rules];

    // Start backward chaining
    this.addStep('query', `Mencoba membuktikan: ${goal}`, 0);
    
    const proofTree = this.prove(goal, 0);
    const goalProven = proofTree.proven;

    // Generate result
    const result: BackwardInferenceResult = {
      success: true,
      goalProven,
      steps: this.inferenceSteps,
      usedFacts: Array.from(this.usedFacts),
      usedRules: Array.from(this.usedRules),
      message: goalProven 
        ? `Goal '${goal}' berhasil dibuktikan!` 
        : `Goal '${goal}' tidak dapat dibuktikan dengan fakta yang ada`,
      proofTree
    };

    return result;
  }

  private prove(goal: string, depth: number): ProofNode {
    if (depth > this.maxDepth) {
      this.addStep('failed', `Kedalaman maksimum tercapai untuk goal: ${goal}`, depth);
      return { goal, proven: false };
    }

    // Check if goal is already a known fact
    if (this.knownFacts.has(goal)) {
      this.addStep('fact_check', `Fakta '${goal}' sudah diketahui`, depth);
      this.usedFacts.add(goal);
      return { goal, proven: true, facts: [goal] };
    }

    // Find rules that can prove this goal
    const applicableRules = this.rules.filter(rule => rule.conclusion === goal);
    
    if (applicableRules.length === 0) {
      this.addStep('failed', `Tidak ada aturan yang dapat membuktikan: ${goal}`, depth);
      return { goal, proven: false };
    }

    // Try to prove using each applicable rule
    for (const rule of applicableRules) {
      this.addStep('rule_check', `Mencoba aturan: ${rule.description}`, depth, rule.conditions);
      
      const childNodes: ProofNode[] = [];
      let allConditionsProven = true;

      // Try to prove each condition
      for (const condition of rule.conditions) {
        this.addStep('query', `Sub-goal: Membuktikan ${condition}`, depth + 1);
        const childProof = this.prove(condition, depth + 1);
        childNodes.push(childProof);
        
        if (!childProof.proven) {
          allConditionsProven = false;
          break;
        }
      }

      if (allConditionsProven) {
        this.addStep('proven', `Goal '${goal}' terbukti dengan aturan: ${rule.description}`, depth);
        this.usedRules.add(rule.id);
        return {
          goal,
          proven: true,
          rule: rule.description,
          children: childNodes
        };
      }
    }

    this.addStep('failed', `Tidak dapat membuktikan goal: ${goal}`, depth);
    return { goal, proven: false };
  }

  private addStep(
    type: BackwardInferenceStep['type'],
    query: string,
    depth: number,
    subgoals?: string[]
  ): void {
    const step: BackwardInferenceStep = {
      stepNumber: ++this.stepCounter,
      type,
      query,
      depth,
      timestamp: Date.now(),
      ...(subgoals && { subgoals })
    };
    this.inferenceSteps.push(step);
  }

  public getInferenceSteps(): BackwardInferenceStep[] {
    return this.inferenceSteps;
  }

  public getUsedFacts(): string[] {
    return Array.from(this.usedFacts);
  }

  public getUsedRules(): string[] {
    return Array.from(this.usedRules);
  }
}
