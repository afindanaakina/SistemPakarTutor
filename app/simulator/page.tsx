'use client';

import { useState } from 'react';
import { Fact, Rule, InferenceResult } from '../types/forward-chaining';
import { ForwardChainingEngine } from '../lib/forward-chaining-engine';
import Card from '../components/Card';
import FlowDiagram from '../components/FlowDiagram';
import ProgressBar from '../components/ProgressBar';
import Confetti from '../components/Confetti';
import Link from 'next/link';

type WizardStep = 'setup' | 'facts' | 'rules' | 'validate' | 'execute' | 'results';

export default function SimulatorPage() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('setup');
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [facts, setFacts] = useState<Fact[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [goalFact, setGoalFact] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentAnimStep, setCurrentAnimStep] = useState(-1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [newFactId, setNewFactId] = useState('');
  const [newFactValue, setNewFactValue] = useState('');
  const [draggedFact, setDraggedFact] = useState<string | null>(null);
  const [newRuleConditions, setNewRuleConditions] = useState<string[]>([]);
  const [newRuleConclusion, setNewRuleConclusion] = useState('');
  const [newRuleDescription, setNewRuleDescription] = useState('');

  const wizardSteps = ['Pengaturan', 'Fakta', 'Aturan', 'Validasi', 'Eksekusi'];
  const stepIndex = { setup: 0, facts: 1, rules: 2, validate: 3, execute: 4, results: 4 };

  const validateProject = () => {
    const errors: string[] = [];
    if (facts.length < 2) errors.push('Minimal 2 fakta diperlukan');
    if (rules.length < 1) errors.push('Minimal 1 aturan diperlukan');
    
    // Get all valid IDs: fakta awal + kesimpulan dari semua aturan
    const allValidIds = new Set([
      ...facts.map(f => f.id),
      ...rules.map(r => r.conclusion)
    ]);
    
    rules.forEach((rule, idx) => {
      const invalidConditions = rule.conditions.filter(c => !allValidIds.has(c));
      if (invalidConditions.length > 0) {
        errors.push(`Aturan ${idx + 1}: Kondisi ${invalidConditions.join(', ')} tidak valid (bukan fakta awal atau kesimpulan aturan lain)`);
      }
    });
    
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

  const runSimulation = () => {
    const engine = new ForwardChainingEngine();
    const inferenceResult = engine.run(facts, rules, goalFact || undefined);
    setResult(inferenceResult);
    setCurrentStep('results');
    
    if (inferenceResult.success) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      animateSteps(inferenceResult);
    }
  };

  const animateSteps = (result: InferenceResult) => {
    let index = -1;
    const interval = setInterval(() => {
      index++;
      setCurrentAnimStep(index);
      if (index >= result.steps.length - 1) clearInterval(interval);
    }, 1500);
  };

  const loadExample = () => {
    setProjectName('Sistem Identifikasi Hewan');
    setProjectDesc('Sistem pakar untuk mengidentifikasi jenis hewan berdasarkan karakteristiknya');
    setFacts([
      { id: 'has_fur', value: 'Memiliki bulu' },
      { id: 'gives_milk', value: 'Menyusui' },
      { id: 'eats_meat', value: 'Memakan daging' },
    ]);
    setRules([
      { id: 'R1', conditions: ['has_fur'], conclusion: 'is_mammal', description: 'Jika memiliki bulu maka mamalia' },
      { id: 'R2', conditions: ['is_mammal', 'eats_meat'], conclusion: 'is_carnivore', description: 'Jika mamalia dan makan daging maka karnivora' },
    ]);
    setGoalFact('is_carnivore');
    setCurrentStep('facts');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      {showConfetti && <Confetti />}
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/materi" className="hover:text-blue-600">Forward Chaining</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Simulator</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pembuat Sistem Pakar</h1>
          <p className="text-gray-600">Bangun sistem pakar Anda sendiri langkah demi langkah</p>
        </div>

        {currentStep !== 'results' && (
          <div className="mb-8">
            <ProgressBar currentStep={stepIndex[currentStep]} totalSteps={wizardSteps.length} steps={wizardSteps} />
          </div>
        )}

        {/* Setup Step */}
        {currentStep === 'setup' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <Card title="Project Setup">
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <p className="text-blue-900 text-sm">
                    <strong>Langkah 1:</strong> Tentukan nama dan deskripsi proyek sistem pakar Anda
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Proyek *</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Sistem Diagnosis Penyakit"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Proyek</label>
                  <textarea
                    value={projectDesc}
                    onChange={(e) => setProjectDesc(e.target.value)}
                    placeholder="Jelaskan tujuan sistem pakar ini..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => projectName && setCurrentStep('facts')}
                    disabled={!projectName}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition-all"
                  >
                    Mulai Proyek →
                  </button>
                  <button
                    onClick={loadExample}
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-all"
                  >
                    Muat Template
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
              <Card title="Knowledge Base: Fakta">
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 text-sm text-green-800">
                    Tambahkan fakta-fakta yang akan menjadi input awal sistem
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ID Fakta</label>
                      <input
                        type="text"
                        value={newFactId}
                        onChange={(e) => setNewFactId(e.target.value)}
                        placeholder="fever"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                      <input
                        type="text"
                        value={newFactValue}
                        onChange={(e) => setNewFactValue(e.target.value)}
                        placeholder="Demam"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <button onClick={addFact} className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    + Tambah Fakta
                  </button>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card title={`Daftar Fakta (${facts.length})`}>
                {facts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Belum ada fakta</div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {facts.map((fact) => (
                      <div key={fact.id} draggable onDragStart={() => setDraggedFact(fact.id)}
                        className="bg-green-50 border-2 border-green-300 rounded-lg p-3 cursor-move hover:shadow">
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
            </div>

            <div className="lg:col-span-2 flex gap-3">
              <button onClick={() => setCurrentStep('setup')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                ← Kembali
              </button>
              <button onClick={() => setCurrentStep('rules')} disabled={facts.length < 2}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                Lanjut: Buat Aturan →
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
                    <strong>💡 Tips:</strong> Kondisi bisa berupa fakta awal atau kesimpulan dari aturan lain. 
                    Ini disebut <strong>chaining</strong>!
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kondisi (IF)</label>
                    <div onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); draggedFact && !newRuleConditions.includes(draggedFact) && setNewRuleConditions([...newRuleConditions, draggedFact]); }}
                      className="min-h-20 border-4 border-dashed border-purple-300 rounded-lg p-3 bg-purple-50">
                      {newRuleConditions.length === 0 ? (
                        <p className="text-purple-400 text-center py-2">Drag fakta atau ketik ID kesimpulan aturan lain</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {newRuleConditions.map((c, i) => (
                            <span key={i} className="px-3 py-1 bg-purple-200 text-purple-900 rounded-full text-sm">
                              {c} <button onClick={() => setNewRuleConditions(newRuleConditions.filter((_, idx) => idx !== i))}>×</button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <input 
                      type="text" 
                      placeholder="Atau ketik ID kondisi dan tekan Enter"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          const condId = e.currentTarget.value.trim();
                          if (!newRuleConditions.includes(condId)) {
                            setNewRuleConditions([...newRuleConditions, condId]);
                          }
                          e.currentTarget.value = '';
                        }
                      }}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kesimpulan (THEN)</label>
                    <input type="text" value={newRuleConclusion} onChange={(e) => setNewRuleConclusion(e.target.value)} placeholder="has_flu"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <input type="text" value={newRuleDescription} onChange={(e) => setNewRuleDescription(e.target.value)} placeholder="Jika demam dan batuk maka flu"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <button onClick={addRule} className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    + Tambah Aturan
                  </button>
                </div>
              </Card>

              <Card title="Fakta Tersedia">
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {facts.map((fact) => (
                    <div key={fact.id} draggable onDragStart={() => setDraggedFact(fact.id)}
                      className="bg-green-100 border border-green-300 rounded p-2 cursor-move text-sm">
                      <p className="font-medium text-green-900">{fact.value}</p>
                      <p className="text-xs text-green-700">{fact.id}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card title={`Aturan (${rules.length})`}>
                {rules.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Belum ada aturan</div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {rules.map((rule) => (
                      <div key={rule.id} className="bg-purple-50 border-2 border-purple-300 rounded-lg p-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-bold text-purple-900">{rule.description}</p>
                            <p className="text-sm text-purple-700">IF {rule.conditions.join(' AND ')} → {rule.conclusion}</p>
                          </div>
                          <button onClick={() => setRules(rules.filter(r => r.id !== rule.id))} className="text-red-600">×</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            <div className="lg:col-span-2 flex gap-3">
              <button onClick={() => setCurrentStep('facts')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                ← Kembali
              </button>
              <button onClick={() => { validateProject(); setCurrentStep('validate'); }} disabled={rules.length < 1}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
                Validasi Sistem →
              </button>
            </div>
          </div>
        )}

        {/* Validate Step */}
        {currentStep === 'validate' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card title="Validasi Sistem">
              {validationErrors.length > 0 ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="font-bold text-red-900 mb-2">Error Validasi:</p>
                  <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
                    {validationErrors.map((err, i) => <li key={i}>{err}</li>)}
                  </ul>
                </div>
              ) : (
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="font-bold text-green-900">✓ Validasi Berhasil!</p>
                  <p className="text-green-800 text-sm">Sistem siap dijalankan</p>
                </div>
              )}

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-blue-600">{facts.length}</div>
                  <div className="text-sm text-gray-600">Fakta</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600">{rules.length}</div>
                  <div className="text-sm text-gray-600">Aturan</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-600">{goalFact ? '1' : '0'}</div>
                  <div className="text-sm text-gray-600">Goal</div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal (Opsional)</label>
                <input type="text" value={goalFact} onChange={(e) => setGoalFact(e.target.value)} placeholder="Target fakta yang ingin dicapai"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg" />
              </div>
            </Card>

            <div className="flex gap-3">
              <button onClick={() => setCurrentStep('rules')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                ← Kembali
              </button>
              <button onClick={runSimulation} disabled={validationErrors.length > 0}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 font-bold text-lg shadow-lg">
                Jalankan Mesin Inferensi →
              </button>
            </div>
          </div>
        )}

        {/* Results Step */}
        {currentStep === 'results' && result && (
          <div className="max-w-6xl mx-auto space-y-6">
            <Card title="Hasil Eksekusi">
              <div className={`rounded-xl p-6 ${result.goalReached ? 'bg-green-50 border-2 border-green-300' : result.success ? 'bg-blue-50 border-2 border-blue-300' : 'bg-yellow-50 border-2 border-yellow-300'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${result.goalReached ? 'bg-green-200' : result.success ? 'bg-blue-200' : 'bg-yellow-200'}`}>
                    {result.goalReached || result.success ? '✓' : '!'}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${result.goalReached ? 'text-green-900' : result.success ? 'text-blue-900' : 'text-yellow-900'}`}>
                      {result.message}
                    </h3>
                    <div className="flex gap-4 mt-2 text-sm font-medium">
                      <span>Langkah: {result.steps.length}</span>
                      <span>Total Fakta: {result.finalFacts.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Inference Trace">
              <FlowDiagram steps={result.steps} currentStep={currentAnimStep} />
            </Card>

            <div className="flex gap-3">
              <button onClick={() => { setCurrentStep('setup'); setResult(null); setCurrentAnimStep(-1); }}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Proyek Baru
              </button>
              <button onClick={() => setCurrentStep('validate')} className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50">
                Modifikasi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
