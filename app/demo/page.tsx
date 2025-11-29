'use client';

import { useState } from 'react';
import { demoCases } from '../lib/demo-cases';
import { ForwardChainingEngine } from '../lib/forward-chaining-engine';
import { InferenceResult } from '../types/forward-chaining';
import Card from '../components/Card';
import FlowDiagram from '../components/FlowDiagram';
import Confetti from '../components/Confetti';
import Link from 'next/link';

export default function DemoPage() {
  const [selectedCase, setSelectedCase] = useState(demoCases[0]);
  const [result, setResult] = useState<InferenceResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentAnimStep, setCurrentAnimStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  const runInference = () => {
    setIsRunning(true);
    setResult(null);
    setCurrentAnimStep(-1);
    
    const engine = new ForwardChainingEngine();
    
    setTimeout(() => {
      const inferenceResult = engine.run(
        selectedCase.initialFacts,
        selectedCase.rules,
        selectedCase.goal
      );
      setResult(inferenceResult);
      setIsRunning(false);
      
      if (inferenceResult.goalReached) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }, 800);
  };

  const playAnimation = () => {
    if (!result) return;
    setIsPlaying(true);
    setCurrentAnimStep(-1);
    
    let index = -1;
    const interval = setInterval(() => {
      index++;
      setCurrentAnimStep(index);
      if (index >= result.steps.length - 1) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-8">
      {showConfetti && <Confetti />}
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/materi" className="hover:text-blue-600">Forward Chaining</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Demo</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Demo Kasus Nyata</h1>
          <p className="text-gray-600">Lihat bagaimana sistem pakar bekerja dalam berbagai studi kasus nyata</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card title="Pilih Kasus">
              <div className="space-y-2">
                {demoCases.map((demoCase) => (
                  <button
                    key={demoCase.id}
                    onClick={() => {
                      setSelectedCase(demoCase);
                      setResult(null);
                      setCurrentAnimStep(-1);
                      setIsPlaying(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedCase.id === demoCase.id
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{demoCase.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{demoCase.description}</p>
                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded">
                      {demoCase.category}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            <Card title="Informasi Kasus">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-xs font-medium text-green-900">Fakta Awal</span>
                  <span className="text-lg font-bold text-green-600">{selectedCase.initialFacts.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="text-xs font-medium text-purple-900">Aturan</span>
                  <span className="text-lg font-bold text-purple-600">{selectedCase.rules.length}</span>
                </div>
                {selectedCase.goal && (
                  <div className="p-2 bg-yellow-50 rounded">
                    <span className="text-xs font-medium text-yellow-900">Tujuan</span>
                    <p className="text-xs font-bold text-yellow-700 mt-1">{selectedCase.goal}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Case Header */}
            <Card>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedCase.title}</h2>
                  <p className="text-gray-600">{selectedCase.description}</p>
                  <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full">
                    {selectedCase.category}
                  </span>
                </div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-4 py-2 text-sm border-2 border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {showDetails ? 'Sembunyikan Detail' : 'Tampilkan Detail'}
                </button>
              </div>

              {/* Knowledge Base Details */}
              {showDetails && (
                <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                        {selectedCase.initialFacts.length}
                      </span>
                      Fakta Awal (Data Masukan)
                    </h3>
                    <div className="space-y-2">
                      {selectedCase.initialFacts.map((fact) => (
                        <div key={fact.id} className="bg-green-50 border-l-4 border-green-500 rounded p-2">
                          <p className="font-medium text-green-900 text-sm">{fact.value}</p>
                          <p className="text-xs text-green-700">ID: {fact.id}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs">
                        {selectedCase.rules.length}
                      </span>
                      Aturan Produksi (IF-THEN)
                    </h3>
                    <div className="space-y-2">
                      {selectedCase.rules.map((rule, idx) => (
                        <div key={rule.id} className="bg-purple-50 border-l-4 border-purple-500 rounded p-2">
                          <div className="flex items-start gap-2">
                            <span className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                              {idx + 1}
                            </span>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-purple-900">{rule.description}</p>
                              <p className="text-xs text-purple-700 mt-1">
                                IF {rule.conditions.join(' ∧ ')} → {rule.conclusion}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Control Panel */}
            <Card title="Jalankan Sistem">
              <div className="flex gap-3">
                <button
                  onClick={runInference}
                  disabled={isRunning}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 font-bold transition-all shadow-lg"
                >
                  {isRunning ? 'Memproses...' : 'Jalankan Mesin Inferensi'}
                </button>
                {result && !isPlaying && (
                  <button
                    onClick={playAnimation}
                    className="px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold transition-all"
                  >
                    Putar Animasi
                  </button>
                )}
                {result && (
                  <button
                    onClick={() => { setResult(null); setCurrentAnimStep(-1); setIsPlaying(false); }}
                    className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-all"
                  >
                    Ulang
                  </button>
                )}
              </div>
            </Card>

            {/* Results */}
            {result && (
              <>
                <Card title="Hasil Eksekusi">
                  <div className={`rounded-xl p-6 ${
                    result.goalReached
                      ? 'bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300'
                      : result.success
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300'
                      : 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300'
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                        result.goalReached ? 'bg-green-200' : result.success ? 'bg-blue-200' : 'bg-yellow-200'
                      }`}>
                        {result.goalReached || result.success ? '✓' : '!'}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${
                          result.goalReached ? 'text-green-900' : result.success ? 'text-blue-900' : 'text-yellow-900'
                        }`}>
                          {result.message}
                        </h3>
                        <div className="flex gap-4 mt-2 text-sm font-medium">
                          <span>Langkah Inferensi: {result.steps.length}</span>
                          <span>Fakta yang Diturunkan: {result.finalFacts.length}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <h4 className="font-semibold text-gray-900 mb-2">Memori Akhir (Semua Fakta):</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.finalFacts.map((factId, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                              result.goalReached
                                ? 'bg-green-200 text-green-800'
                                : result.success
                                ? 'bg-blue-200 text-blue-800'
                                : 'bg-yellow-200 text-yellow-800'
                            }`}
                          >
                            {factId}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card title="Visualisasi Proses Inferensi">
                  <div className="bg-gray-50 rounded-lg p-6">
                    {isPlaying && (
                      <div className="mb-4 bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
                        <p className="text-blue-900 font-medium flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                          Animasi sedang berjalan... (Langkah {currentAnimStep + 1} dari {result.steps.length})
                        </p>
                      </div>
                    )}
                    <FlowDiagram steps={result.steps} currentStep={isPlaying ? currentAnimStep : -1} />
                  </div>
                </Card>

                {/* Performance Metrics */}
                <Card title="Analisis Kinerja">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{result.steps.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Langkah Inferensi</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{result.finalFacts.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Fakta Diturunkan</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedCase.rules.length}</div>
                      <div className="text-xs text-gray-600 mt-1">Aturan Dieksekusi</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {result.goalReached ? '100%' : `${Math.round((result.steps.length / selectedCase.rules.length) * 100)}%`}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Tingkat Keberhasilan</div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
