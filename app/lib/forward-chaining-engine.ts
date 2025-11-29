import { Fact, Rule, InferenceStep, InferenceResult, KnowledgeBase } from '../types/forward-chaining';

export class ForwardChainingEngine {
  private workingMemory: Set<string>;
  private inferenceSteps: InferenceStep[];
  private stepCounter: number;

  constructor() {
    this.workingMemory = new Set();
    this.inferenceSteps = [];
    this.stepCounter = 0;
  }

  private canFireRule(rule: Rule, facts: Map<string, Fact>): boolean {
    if (rule.fired) return false;
    
    return rule.conditions.every(conditionId => 
      this.workingMemory.has(conditionId) && facts.has(conditionId)
    );
  }

  private addFactToWorkingMemory(factId: string): void {
    this.workingMemory.add(factId);
  }

  public run(
    initialFacts: Fact[],
    rules: Rule[],
    goal?: string
  ): InferenceResult {
    // Reset engine state
    this.workingMemory.clear();
    this.inferenceSteps = [];
    this.stepCounter = 0;

    // Create fact map for easy lookup
    const factMap = new Map<string, Fact>();
    initialFacts.forEach(fact => {
      factMap.set(fact.id, fact);
      this.addFactToWorkingMemory(fact.id);
    });

    // Create a mutable copy of rules
    const rulesCopy = rules.map(rule => ({ ...rule, fired: false }));
    let changed = true;
    let goalReached = false;

    // Main inference loop
    while (changed && !goalReached) {
      changed = false;

      for (const rule of rulesCopy) {
        if (this.canFireRule(rule, factMap)) {
          // Fire the rule
          rule.fired = true;
          changed = true;

          // Check if conclusion fact already exists
          if (!factMap.has(rule.conclusion)) {
            // Create new fact from conclusion
            const newFact: Fact = {
              id: rule.conclusion,
              value: rule.conclusion,
              description: `Derived from rule: ${rule.description}`
            };

            factMap.set(newFact.id, newFact);
            this.addFactToWorkingMemory(newFact.id);

            // Record inference step
            this.stepCounter++;
            this.inferenceSteps.push({
              stepNumber: this.stepCounter,
              firedRule: rule,
              newFact: newFact,
              currentFacts: Array.from(this.workingMemory),
              timestamp: Date.now()
            });

            // Check if goal is reached
            if (goal && newFact.id === goal) {
              goalReached = true;
              break;
            }
          }
        }
      }
    }

    const finalFacts = Array.from(this.workingMemory);
    const success = this.inferenceSteps.length > 0;

    let message = '';
    if (goalReached && goal) {
      message = `Goal "${goal}" reached successfully in ${this.stepCounter} steps.`;
    } else if (goal && !goalReached) {
      message = `Goal "${goal}" could not be reached with the given facts and rules.`;
    } else if (success) {
      message = `Inference completed with ${this.stepCounter} steps.`;
    } else {
      message = 'No new facts could be derived.';
    }

    return {
      success,
      steps: this.inferenceSteps,
      finalFacts,
      goal,
      goalReached,
      message
    };
  }

  public getWorkingMemory(): string[] {
    return Array.from(this.workingMemory);
  }

  public getInferenceSteps(): InferenceStep[] {
    return this.inferenceSteps;
  }

  public reset(): void {
    this.workingMemory.clear();
    this.inferenceSteps = [];
    this.stepCounter = 0;
  }
}
