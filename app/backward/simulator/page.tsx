'use client';

import { useState } from 'react';
import { Fact, Rule } from '../../types/forward-chaining';
import { BackwardChainingEngine } from '../../lib/backward-chaining-engine';
import { BackwardInferenceResult, ProofNode } from '../../types/backward-chaining';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import Confetti from '../../components/Confetti';
import Link from 'next/link';

type WizardStep = 'goal' | 'facts' | 'rules' | 'validate' | 'execute' | 'results';

export default function BackwardSimulatorPage() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('goal');
  const [projectName, setProjectName] = useState('');
  const [goal, setGoal] = useState('');
  const [goalDesc, setGoalDesc] = useState('');
  const [facts, setFacts] = useState<Fact[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [result, setResult] = useState<BackwardInferenceResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [newFactId, setNewFactId] = useState('');
  const [newFactValue, setNewFactValue] = useState('');
  const [newRuleConditions, setNewRuleConditions] = useState<string[]>([]);
  const [newRuleConclusion, setNewRuleConclusion] = useState('');
  const [newRuleDescription, setNewRuleDescription] = useState('');

  const wizardSteps = ['Define Goal', 'Set Facts', 'Build Rules', 'Validate', 'Prove'];
  const stepIndex = { goal: 0, facts: 1, rules: 2, validate: 3, execute: 4, results: 4 };

  const validateProject = () => {
    const errors: string[] = [];
    if (!goal) errors.push('Goal belum ditentukan');
    if (facts.length < 1) errors.push('Minimal 1 fakta diperlukan');
    if (rules.length < 1) errors.push('Minimal 1 aturan diperlukan');
    
    // Check if goal can potentially be proven
    const hasRuleForGoal = rules.some(r => r.conclusion === goal);
    if (!hasRuleForGoal && !facts.find(f => f.id === goal)) {
      errors.push(`Tidak ada aturan atau fakta yang dapat membuktikan goal: ${goal}`);
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const addFact = () => {
    if (!newFactId || !newFactValue) return;
    if (facts.find(f => f.id === newFactId)) {
      alert('ID fakta sudah ada!');
      return;
    }
    setFacts([...facts, { id: newFactId, value: newFactValue }]);
    setNewFactId('');
    setNewFactValue('');
  };

  const addRule = () => {
    if (!newRuleConclusion || newRuleConditions.length === 0 || !newRuleDescription) return;
    setRules([...rules, {
      id: `R${rules.length + 1}`,
      conditions: newRuleConditions,
      conclusion: newRuleConclusion,
      description: newRuleDescription,
    }]);
    setNewRuleConditions([]);
    setNewRuleConclusion('');
    setNewRuleDescription('');
  };

  const runProof = () => {
    const engine = new BackwardChainingEngine();
    const inferenceResult = engine.run(facts, rules, goal);
    setResult(inferenceResult);
    setCurrentStep('results');
    
    if (inferenceResult.goalProven) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const loadExample = () => {
    setProjectName('Sistem Diagnosis Flu');
    setGoal('has_flu');
    setGoalDesc('Membuktikan apakah pasien menderita flu');
    setFacts([
      { id: 'fever', value: 'Pasien demam' },
      { id: 'headache', value: 'Pasien sakit kepala' },
      { id: 'cough', value: 'Pasien batuk' },
    ]);
    setRules([
      { id: 'R1', conditions: ['fever', 'headache'], conclusion: 'flu_symptoms', description: 'Jika demam dan sakit kepala maka gejala flu' },
      { id: 'R2', conditions: ['flu_symptoms', 'cough'], conclusion: 'has_flu', description: 'Jika gejala flu dan batuk maka terdiagnosis flu' },
    ]);
    setCurrentStep('facts');
  };

  const renderProofTree = (node: ProofNode, depth: number = 0) => {
    return (
      <div className={`ml-${depth * 8} mt-2`}>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
          node.proven ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <span className="font-semibold">{node.goal}</span>
          <span className="text-xs">{node.proven ? '✓' : '✗'}</span>
        </div>
        {node.rule && (
          <div className="ml-4 mt-1 text-sm text-gray-600">
            via: {node.rule}
          </div>
        )}
        {node.children && node.children.map((child, i) => (
          <div key={i}>{renderProofTree(child, depth + 1)}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      {showConfetti && <Confetti />}
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/learning-path" className="hover:text-blue-600">Learning Path</Link>
          <span className="mx-2">/</span>
          <Link href="/backward" className="hover:text-blue-600">Backward Chaining</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Simulator</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Backward Chaining Simulator</h1>
          <p className="text-gray-600">Goal-driven reasoning untuk membuktikan hipotesis</p>
        </div>

        {currentStep !== 'results' && (
          <div className="mb-8">
            <ProgressBar currentStep={stepIndex[currentStep]} totalSteps={wizardSteps.length} steps={wizardSteps} />
          </div>
        )}

        {/* Goal Definition Step */}
        {currentStep === 'goal' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <Card title="Step 1: Define Your Goal">
              <div className="space-y-4">
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
                  <p className="text-purple-900 text-sm">
                    <strong>Backward Chaining dimulai dari goal.</strong> Tentukan apa yang ingin Anda buktikan.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Proyek</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Sistem Diagnosis Penyakit"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Goal ID *</label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="has_flu"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Goal</label>
                  <textarea
                    value={goalDesc}
                    onChange={(e) => setGoalDesc(e.target.value)}
                    placeholder="Membuktikan apakah pasien menderita flu"
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => goal && setCurrentStep('facts')}
                    disabled={!goal}
                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 font-medium"
                  >
                    Lanjutkan →
                  </button>
                  <button
                    onClick={loadExample}
                    className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-medium"
                  >
                    Load Example
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Facts Step */}
        {currentStep === 'facts' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card title="Known Facts">
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 text-sm text-green-800">
                    Tambahkan fakta-fakta yang sudah diketahui. Sistem akan mencoba membuktikan goal berdasarkan fakta ini.
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newFactId}
                      onChange={(e) => setNewFactId(e.target.value)}
                      placeholder="fever"
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newFactValue}
                      onChange={(e) => setNewFactValue(e.target.value)}
                      placeholder="Pasien demam"
                      className="px-3 py-2 border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                  <button onClick={addFact} className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    + Add Fact
                  </button>
                </div>
              </Card>

              <Card>
                <div className="bg-purple-100 rounded-lg p-4">
                  <h4 className="font-bold text-purple-900 mb-2">Current Goal:</h4>
                  <p className="text-purple-800 font-mono">{goal}</p>
                  {goalDesc && <p className="text-sm text-purple-700 mt-1">{goalDesc}</p>}
                </div>
              </Card>
            </div>

            <Card title={`Facts Database (${facts.length})`}>
              {facts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No facts added yet</div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {facts.map((fact) => (
                    <div key={fact.id} className="bg-green-50 border-2 border-green-300 rounded-lg p-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-bold text-green-900">{fact.value}</p>
                          <p className="text-sm text-green-700">ID: {fact.id}</p>
                        </div>
                        <button onClick={() => setFacts(facts.filter(f => f.id !== fact.id))} className="text-red-600">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <div className="lg:col-span-2 flex gap-3">
              <button onClick={() => setCurrentStep('goal')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                ← Back
              </button>
              <button onClick={() => setCurrentStep('rules')} disabled={facts.length < 1}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400">
                Next: Define Rules →
              </button>
            </div>
          </div>
        )}

        {/* Rules Step */}
        {currentStep === 'rules' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card title="Rule Builder">
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 text-sm text-blue-800">
                    Buat aturan yang dapat membuktikan goal atau sub-goal
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Conditions (IF)</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        placeholder="Add condition ID"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value) {
                            setNewRuleConditions([...newRuleConditions, e.currentTarget.value]);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg"
                      />
                    </div>
                    {newRuleConditions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {newRuleConditions.map((c, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-200 text-blue-900 rounded-full text-sm">
                            {c} <button onClick={() => setNewRuleConditions(newRuleConditions.filter((_, idx) => idx !== i))}>×</button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Conclusion (THEN)</label>
                    <input type="text" value={newRuleConclusion} onChange={(e) => setNewRuleConclusion(e.target.value)} 
                      placeholder="Conclusion ID" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <input type="text" value={newRuleDescription} onChange={(e) => setNewRuleDescription(e.target.value)}
                      placeholder="Rule description" className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg" />
                  </div>
                  <button onClick={addRule} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Add Rule
                  </button>
                </div>
              </Card>
            </div>

            <Card title={`Rules (${rules.length})`}>
              {rules.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No rules defined yet</div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {rules.map((rule) => (
                    <div key={rule.id} className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-bold text-blue-900">{rule.description}</p>
                          <p className="text-sm text-blue-700">IF {rule.conditions.join(' AND ')} → {rule.conclusion}</p>
                        </div>
                        <button onClick={() => setRules(rules.filter(r => r.id !== rule.id))} className="text-red-600">×</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <div className="lg:col-span-2 flex gap-3">
              <button onClick={() => setCurrentStep('facts')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                ← Back
              </button>
              <button onClick={() => { if (validateProject()) setCurrentStep('validate'); }} disabled={rules.length < 1}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400">
                Validate System →
              </button>
            </div>
          </div>
        )}

        {/* Validate Step */}
        {currentStep === 'validate' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card title="System Validation">
              {validationErrors.length > 0 ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="font-bold text-red-900 mb-2">Validation Errors:</p>
                  <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
                    {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
                  </ul>
                </div>
              ) : (
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="font-bold text-green-900">✓ System Valid!</p>
                  <p className="text-green-800 text-sm">Ready to prove the goal</p>
                </div>
              )}

              <div className="mt-6 grid md:grid-cols-4 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">1</div>
                  <div className="text-xs text-gray-600">Goal</div>
                  <div className="text-sm font-mono mt-1 text-purple-700">{goal}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{facts.length}</div>
                  <div className="text-xs text-gray-600">Facts</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{rules.length}</div>
                  <div className="text-xs text-gray-600">Rules</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {rules.filter(r => r.conclusion === goal).length}
                  </div>
                  <div className="text-xs text-gray-600">Goal Rules</div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <button onClick={() => setCurrentStep('rules')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                ← Back
              </button>
              <button onClick={runProof} disabled={validationErrors.length > 0}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 font-bold text-lg shadow-lg">
                Start Proof Process
              </button>
            </div>
          </div>
        )}

        {/* Results Step */}
        {currentStep === 'results' && result && (
          <div className="max-w-6xl mx-auto space-y-6">
            <Card title="Proof Results">
              <div className={`rounded-xl p-6 ${
                result.goalProven ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    result.goalProven ? 'bg-green-200' : 'bg-red-200'
                  }`}>
                    {result.goalProven ? '✓' : '✗'}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${
                      result.goalProven ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {result.message}
                    </h3>
                    <div className="flex gap-4 mt-2 text-sm font-medium">
                      <span>Steps: {result.steps.length}</span>
                      <span>Used Facts: {result.usedFacts.length}</span>
                      <span>Used Rules: {result.usedRules.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {result.proofTree && (
              <Card title="Proof Tree Visualization">
                <div className="bg-gray-50 rounded-lg p-6 overflow-x-auto">
                  {renderProofTree(result.proofTree)}
                </div>
              </Card>
            )}

            <Card title="Inference Trace">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {result.steps.map((step, i) => (
                  <div key={i} className={`border-l-4 pl-4 py-2 ${
                    step.type === 'query' ? 'border-purple-500' :
                    step.type === 'fact_check' ? 'border-green-500' :
                    step.type === 'rule_check' ? 'border-blue-500' :
                    step.type === 'proven' ? 'border-green-500' :
                    'border-red-500'
                  }`} style={{ marginLeft: `${step.depth * 2}rem` }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500">Step {step.stepNumber}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        step.type === 'query' ? 'bg-purple-100 text-purple-700' :
                        step.type === 'fact_check' ? 'bg-green-100 text-green-700' :
                        step.type === 'rule_check' ? 'bg-blue-100 text-blue-700' :
                        step.type === 'proven' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {step.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{step.query}</p>
                    {step.subgoals && (
                      <p className="text-xs text-gray-600 mt-1">Sub-goals: {step.subgoals.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex gap-3">
              <button onClick={() => { setCurrentStep('goal'); setResult(null); }}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                New Project
              </button>
              <button onClick={() => setCurrentStep('validate')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                Modify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
