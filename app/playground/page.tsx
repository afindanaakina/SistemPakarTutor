'use client';

import { useState } from 'react';
import { Fact, Rule, InferenceResult } from '../types/forward-chaining';
import { BackwardInferenceResult } from '../types/backward-chaining';
import { ForwardChainingEngine } from '../lib/forward-chaining-engine';
import { BackwardChainingEngine } from '../lib/backward-chaining-engine';
import Card from '../components/Card';
import Confetti from '../components/Confetti';
import Link from 'next/link';

type InferenceMethod = 'forward' | 'backward' | 'compare';

export default function PlaygroundPage() {
  const [method, setMethod] = useState<InferenceMethod>('compare');
  const [facts, setFacts] = useState<Fact[]>([]);
  const [rules, setRules] = useState<Rule[]>([]);
  const [goal, setGoal] = useState('');
  const [forwardResult, setForwardResult] = useState<InferenceResult | null>(null);
  const [backwardResult, setBackwardResult] = useState<BackwardInferenceResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const [newFactId, setNewFactId] = useState('');
  const [newFactValue, setNewFactValue] = useState('');
  const [newRuleConditions, setNewRuleConditions] = useState<string[]>([]);
  const [newRuleConclusion, setNewRuleConclusion] = useState('');
  const [newRuleDescription, setNewRuleDescription] = useState('');

  const templates = [
    {
      name: 'Diagnosis Medis',
      facts: [
        { id: 'demam', value: 'Pasien mengalami demam' },
        { id: 'sakit_kepala', value: 'Pasien sakit kepala' },
        { id: 'batuk', value: 'Pasien batuk' },
        { id: 'ruam', value: 'Pasien mengalami ruam' }
      ],
      rules: [
        { id: 'R1', conditions: ['demam', 'sakit_kepala'], conclusion: 'gejala_flu', description: 'Jika demam dan sakit kepala maka gejala flu' },
        { id: 'R2', conditions: ['gejala_flu', 'batuk'], conclusion: 'terkena_flu', description: 'Jika gejala flu dan batuk maka terkena flu' },
        { id: 'R3', conditions: ['demam', 'ruam'], conclusion: 'gejala_campak', description: 'Jika demam dan ruam maka gejala campak' },
        { id: 'R4', conditions: ['gejala_campak'], conclusion: 'terkena_campak', description: 'Jika gejala campak maka terkena campak' }
      ],
      goal: 'terkena_flu'
    },
    {
      name: 'Klasifikasi Hewan',
      facts: [
        { id: 'punya_bulu', value: 'Memiliki bulu' },
        { id: 'menyusui', value: 'Menyusui anak' },
        { id: 'bertelur', value: 'Bertelur' },
        { id: 'punya_sayap', value: 'Memiliki sayap' }
      ],
      rules: [
        { id: 'R1', conditions: ['punya_bulu', 'menyusui'], conclusion: 'mamalia', description: 'Jika punya bulu dan menyusui maka mamalia' },
        { id: 'R2', conditions: ['punya_sayap', 'bertelur'], conclusion: 'burung', description: 'Jika punya sayap dan bertelur maka burung' },
        { id: 'R3', conditions: ['mamalia'], conclusion: 'vertebrata', description: 'Jika mamalia maka vertebrata' },
        { id: 'R4', conditions: ['burung'], conclusion: 'vertebrata', description: 'Jika burung maka vertebrata' }
      ],
      goal: 'vertebrata'
    }
  ];

  const addFact = () => {
    if (!newFactId || !newFactValue) return;
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

  const runInference = () => {
    if (facts.length === 0 || rules.length === 0) {
      alert('Tambahkan minimal satu fakta dan satu aturan');
      return;
    }

    if (method === 'forward' || method === 'compare') {
      const forwardEngine = new ForwardChainingEngine();
      const result = forwardEngine.run(facts, rules, goal || undefined);
      setForwardResult(result);
      
      if (result.goalReached) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }

    if (method === 'backward' || method === 'compare') {
      if (!goal) {
        alert('Tentukan tujuan untuk backward chaining');
        return;
      }
      const backwardEngine = new BackwardChainingEngine();
      const result = backwardEngine.run(facts, rules, goal);
      setBackwardResult(result);
      
      if (result.goalProven) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const loadTemplate = (template: typeof templates[0]) => {
    setFacts(template.facts);
    setRules(template.rules);
    setGoal(template.goal);
    setForwardResult(null);
    setBackwardResult(null);
  };

  const reset = () => {
    setFacts([]);
    setRules([]);
    setGoal('');
    setForwardResult(null);
    setBackwardResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8">
      {showConfetti && <Confetti />}
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Beranda</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Playground</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Playground Sistem Pakar</h1>
          <p className="text-gray-600">Eksperimen dan bandingkan metode Forward vs Backward Chaining</p>
        </div>

        {/* Method Selection */}
        <Card>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setMethod('forward')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  method === 'forward' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Forward Chaining
              </button>
              <button
                onClick={() => setMethod('backward')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  method === 'backward' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Backward Chaining
              </button>
              <button
                onClick={() => setMethod('compare')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  method === 'compare' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bandingkan Keduanya
              </button>
            </div>
            <div className="flex gap-2">
              {templates.map((template) => (
                <button
                  key={template.name}
                  onClick={() => loadTemplate(template)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Muat {template.name}
                </button>
              ))}
              <button
                onClick={reset}
                className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                Ulang Semua
              </button>
            </div>
          </div>
        </Card>

        {/* Knowledge Base Builder */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Facts */}
          <Card title="Fakta (Data Awal)">
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFactId}
                  onChange={(e) => setNewFactId(e.target.value)}
                  placeholder="ID fakta"
                  className="w-1/3 px-2 py-1 text-sm border rounded"
                />
                <input
                  type="text"
                  value={newFactValue}
                  onChange={(e) => setNewFactValue(e.target.value)}
                  placeholder="Deskripsi fakta"
                  className="flex-1 px-2 py-1 text-sm border rounded"
                />
                <button onClick={addFact} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                  +
                </button>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {facts.map((fact) => (
                  <div key={fact.id} className="flex items-center justify-between p-2 bg-green-50 rounded text-sm">
                    <div>
                      <span className="font-mono text-green-700">{fact.id}</span>
                      <span className="text-gray-600 ml-2">{fact.value}</span>
                    </div>
                    <button onClick={() => setFacts(facts.filter(f => f.id !== fact.id))} className="text-red-500">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Rules */}
          <Card title="Aturan (IF-THEN)">
            <div className="space-y-3">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Kondisi (pisahkan dengan koma)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const conditions = e.currentTarget.value.split(',').map(c => c.trim()).filter(c => c);
                      setNewRuleConditions(conditions);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-2 py-1 text-sm border rounded"
                />
                <input
                  type="text"
                  value={newRuleConclusion}
                  onChange={(e) => setNewRuleConclusion(e.target.value)}
                  placeholder="Kesimpulan"
                  className="w-full px-2 py-1 text-sm border rounded"
                />
                <input
                  type="text"
                  value={newRuleDescription}
                  onChange={(e) => setNewRuleDescription(e.target.value)}
                  placeholder="Deskripsi aturan"
                  className="w-full px-2 py-1 text-sm border rounded"
                />
                <button onClick={addRule} className="w-full px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Tambah Aturan
                </button>
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {rules.map((rule) => (
                  <div key={rule.id} className="p-2 bg-blue-50 rounded text-xs">
                    <p className="font-medium text-blue-900">{rule.description}</p>
                    <p className="text-blue-700 font-mono">
                      IF {rule.conditions.join(' ∧ ')} → {rule.conclusion}
                    </p>
                    <button onClick={() => setRules(rules.filter(r => r.id !== rule.id))} className="text-red-500 float-right">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Control */}
          <Card title="Kontrol Eksekusi">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tujuan (untuk backward chaining)
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="misal: terkena_flu"
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                onClick={runInference}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg hover:from-green-600 hover:to-green-700 font-bold shadow-lg"
              >
                Jalankan Inferensi
              </button>
              <div className="text-center text-xs text-gray-500">
                {method === 'forward' && 'Penalaran berbasis data'}
                {method === 'backward' && 'Penalaran berbasis tujuan'}
                {method === 'compare' && 'Membandingkan kedua metode'}
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        {(forwardResult || backwardResult) && (
          <div className={`grid ${method === 'compare' ? 'lg:grid-cols-2' : ''} gap-6 mt-6`}>
            {/* Forward Result */}
            {forwardResult && (method === 'forward' || method === 'compare') && (
              <Card title="Hasil Forward Chaining">
                <div className={`p-4 rounded-lg ${
                  forwardResult.goalReached ? 'bg-green-50 border-2 border-green-300' : 'bg-blue-50 border-2 border-blue-300'
                }`}>
                  <h3 className="font-bold text-lg mb-2">{forwardResult.message}</h3>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{forwardResult.steps.length}</div>
                      <div className="text-xs text-gray-600">Langkah</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{forwardResult.finalFacts.length}</div>
                      <div className="text-xs text-gray-600">Fakta</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {forwardResult.goalReached ? '✓' : '—'}
                      </div>
                      <div className="text-xs text-gray-600">Tujuan</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Fakta Akhir:</h4>
                    <div className="flex flex-wrap gap-1">
                      {forwardResult.finalFacts.map((fact, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs">
                          {fact}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Backward Result */}
            {backwardResult && (method === 'backward' || method === 'compare') && (
              <Card title="Hasil Backward Chaining">
                <div className={`p-4 rounded-lg ${
                  backwardResult.goalProven ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'
                }`}>
                  <h3 className="font-bold text-lg mb-2">{backwardResult.message}</h3>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{backwardResult.steps.length}</div>
                      <div className="text-xs text-gray-600">Langkah</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{backwardResult.usedFacts.length}</div>
                      <div className="text-xs text-gray-600">Fakta Digunakan</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {backwardResult.goalProven ? '✓' : '✗'}
                      </div>
                      <div className="text-xs text-gray-600">Terbukti</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">Fakta yang Digunakan:</h4>
                    <div className="flex flex-wrap gap-1">
                      {backwardResult.usedFacts.map((fact, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-200 text-purple-800 rounded text-xs">
                          {fact}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Comparison Analysis */}
        {method === 'compare' && forwardResult && backwardResult && (
          <Card title="Analisis Perbandingan">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2">Forward Chaining</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li>• Memproses {forwardResult.steps.length} langkah inferensi</li>
                  <li>• Menurunkan {forwardResult.finalFacts.length - facts.length} fakta baru</li>
                  <li>• Tujuan {forwardResult.goalReached ? 'tercapai' : 'tidak tercapai/tidak ditentukan'}</li>
                  <li>• Terbaik untuk: Monitoring, prediksi</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-2">Backward Chaining</h4>
                <ul className="space-y-1 text-sm text-purple-800">
                  <li>• Memproses {backwardResult.steps.length} langkah pembuktian</li>
                  <li>• Menggunakan {backwardResult.usedFacts.length} fakta</li>
                  <li>• Tujuan {backwardResult.goalProven ? 'terbukti' : 'tidak terbukti'}</li>
                  <li>• Terbaik untuk: Diagnosis, verifikasi</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Efisiensi:</strong> 
                {backwardResult.steps.length < forwardResult.steps.length
                  ? ' Backward chaining lebih efisien untuk tujuan spesifik ini.'
                  : ' Forward chaining lebih efisien untuk kasus ini.'}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
