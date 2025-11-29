'use client';

import { useState, useEffect } from 'react';
import { pisangDiseases as initialDiseases } from '../data/pisang-diseases';
import { pisangSymptoms as initialSymptoms } from '../data/pisang-symptoms';
import { pisangRules as initialRules } from '../data/pisang-rules';
import type { PisangDisease } from '../data/pisang-diseases';
import type { PisangSymptom } from '../data/pisang-symptoms';
import type { PisangRule } from '../data/pisang-rules';
import Link from 'next/link';

type Tab = 'dashboard' | 'diseases' | 'symptoms' | 'rules';

export default function PisangAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Data states
  const [pisangDiseases, setPisangDiseases] = useState<PisangDisease[]>([]);
  const [pisangSymptoms, setPisangSymptoms] = useState<PisangSymptom[]>([]);
  const [pisangRules, setPisangRules] = useState<PisangRule[]>([]);

  // Modal states
  const [editingDisease, setEditingDisease] = useState<PisangDisease | null>(null);
  const [editingSymptom, setEditingSymptom] = useState<PisangSymptom | null>(null);
  const [editingRule, setEditingRule] = useState<PisangRule | null>(null);
  const [showDiseaseModal, setShowDiseaseModal] = useState(false);
  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);

  // Load data from localStorage or use initial data
  useEffect(() => {
    const savedDiseases = localStorage.getItem('pisang_diseases');
    const savedSymptoms = localStorage.getItem('pisang_symptoms');
    const savedRules = localStorage.getItem('pisang_rules');

    setPisangDiseases(savedDiseases ? JSON.parse(savedDiseases) : initialDiseases);
    setPisangSymptoms(savedSymptoms ? JSON.parse(savedSymptoms) : initialSymptoms);
    setPisangRules(savedRules ? JSON.parse(savedRules) : initialRules);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (pisangDiseases.length > 0) {
      localStorage.setItem('pisang_diseases', JSON.stringify(pisangDiseases));
    }
  }, [pisangDiseases]);

  useEffect(() => {
    if (pisangSymptoms.length > 0) {
      localStorage.setItem('pisang_symptoms', JSON.stringify(pisangSymptoms));
    }
  }, [pisangSymptoms]);

  useEffect(() => {
    if (pisangRules.length > 0) {
      localStorage.setItem('pisang_rules', JSON.stringify(pisangRules));
    }
  }, [pisangRules]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Password salah!');
    }
  };

  // CRUD Functions for Diseases
  const handleSaveDisease = (disease: PisangDisease) => {
    const existing = pisangDiseases.find(d => d.id === disease.id);
    if (existing) {
      setPisangDiseases(pisangDiseases.map(d => d.id === disease.id ? disease : d));
    } else {
      setPisangDiseases([...pisangDiseases, disease]);
    }
    setShowDiseaseModal(false);
    setEditingDisease(null);
  };

  const handleDeleteDisease = (id: string) => {
    if (confirm('Yakin ingin menghapus penyakit/hama ini?')) {
      setPisangDiseases(pisangDiseases.filter(d => d.id !== id));
      // Also delete related rules
      setPisangRules(pisangRules.filter(r => r.disease_id !== id));
    }
  };

  // CRUD Functions for Symptoms
  const handleSaveSymptom = (symptom: PisangSymptom) => {
    const existing = pisangSymptoms.find(s => s.id === symptom.id);
    if (existing) {
      setPisangSymptoms(pisangSymptoms.map(s => s.id === symptom.id ? symptom : s));
    } else {
      setPisangSymptoms([...pisangSymptoms, symptom]);
    }
    setShowSymptomModal(false);
    setEditingSymptom(null);
  };

  const handleDeleteSymptom = (id: string) => {
    if (confirm('Yakin ingin menghapus gejala ini?')) {
      setPisangSymptoms(pisangSymptoms.filter(s => s.id !== id));
    }
  };

  // CRUD Functions for Rules
  const handleSaveRule = (rule: PisangRule) => {
    const existing = pisangRules.find(r => r.id === rule.id);
    if (existing) {
      setPisangRules(pisangRules.map(r => r.id === rule.id ? rule : r));
    } else {
      setPisangRules([...pisangRules, rule]);
    }
    setShowRuleModal(false);
    setEditingRule(null);
  };

  const handleDeleteRule = (id: string) => {
    if (confirm('Yakin ingin menghapus aturan ini?')) {
      setPisangRules(pisangRules.filter(r => r.id !== id));
    }
  };

  // Export to CSV
  const exportToCSV = (type: 'diseases' | 'symptoms' | 'rules') => {
    let csv = '';
    let filename = '';

    if (type === 'diseases') {
      csv = 'ID,Name,Type,Cause,Description\n';
      pisangDiseases.forEach(d => {
        csv += `"${d.id}","${d.name}","${d.type}","${d.cause}","${d.description}"\n`;
      });
      filename = 'pisang_diseases.csv';
    } else if (type === 'symptoms') {
      csv = 'ID,Name,Category,Description\n';
      pisangSymptoms.forEach(s => {
        csv += `"${s.id}","${s.name}","${s.category}","${s.description || ''}"\n`;
      });
      filename = 'pisang_symptoms.csv';
    } else if (type === 'rules') {
      csv = 'ID,Disease_ID,Symptoms,Confidence,Min_Symptoms\n';
      pisangRules.forEach(r => {
        csv += `"${r.id}","${r.disease_id}","${r.symptoms.join(';')}","${r.confidence}","${r.min_symptoms}"\n`;
      });
      filename = 'pisang_rules.csv';
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  // Import from CSV
  const importFromCSV = (type: 'diseases' | 'symptoms' | 'rules', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      lines.shift(); // Remove header

      if (type === 'diseases') {
        const diseases: PisangDisease[] = [];
        lines.forEach(line => {
          if (!line.trim()) return;
          const [id, name, diseaseType, cause, description] = line.split(',').map(s => s.replace(/"/g, ''));
          const existing = pisangDiseases.find(d => d.id === id);
          if (existing) {
            diseases.push({
              ...existing,
              name,
              type: diseaseType as 'penyakit' | 'hama',
              cause,
              description
            });
          }
        });
        if (diseases.length > 0) {
          setPisangDiseases(pisangDiseases.map(d => {
            const updated = diseases.find(nd => nd.id === d.id);
            return updated || d;
          }));
          alert('Data berhasil diimport!');
        }
      }
    };
    reader.readAsText(file);
  };

  // Reset to default data
  const handleResetData = () => {
    if (confirm('Yakin ingin reset semua data ke default? Semua perubahan akan hilang!')) {
      localStorage.removeItem('pisang_diseases');
      localStorage.removeItem('pisang_symptoms');
      localStorage.removeItem('pisang_rules');
      setPisangDiseases(initialDiseases);
      setPisangSymptoms(initialSymptoms);
      setPisangRules(initialRules);
      alert('Data berhasil direset!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h2>
            <p className="text-gray-600">Sistem Pakar Pisang</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Masukkan password admin"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 font-semibold transition-colors"
            >
              Login
            </button>

            <Link
              href="/pisang"
              className="block text-center text-gray-600 hover:text-gray-900 text-sm"
            >
              ← Kembali ke Beranda
            </Link>
          </div>

          <div className="mt-6 p-3 bg-gray-50 rounded text-xs text-gray-600 text-center">
            Demo: password = <code className="bg-gray-200 px-2 py-1 rounded">admin123</code>
          </div>
        </div>
      </div>
    );
  }

  const stats = {
    totalDiseases: pisangDiseases.length,
    totalHama: pisangDiseases.filter(d => d.type === 'hama').length,
    totalPenyakit: pisangDiseases.filter(d => d.type === 'penyakit').length,
    totalSymptoms: pisangSymptoms.length,
    totalRules: pisangRules.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <div className="bg-yellow-700 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Panel Admin</h1>
              <p className="text-yellow-100 mt-1">Sistem Pakar Diagnosis Hama & Penyakit Pisang</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleResetData}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-medium transition-colors"
              >
                Reset Data
              </button>
              <Link
                href="/pisang"
                className="px-4 py-2 bg-yellow-800 hover:bg-yellow-900 rounded-lg text-sm font-medium transition-colors"
              >
                Ke Beranda
              </Link>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'dashboard' as Tab, label: 'Dashboard', icon: '📊' },
              { id: 'diseases' as Tab, label: 'Penyakit & Hama', icon: '🍌' },
              { id: 'symptoms' as Tab, label: 'Gejala', icon: '🔍' },
              { id: 'rules' as Tab, label: 'Aturan', icon: '📋' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-yellow-600 text-yellow-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistik Sistem</h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-300">
                  <div className="text-3xl font-bold text-blue-700">{stats.totalDiseases}</div>
                  <div className="text-sm text-blue-600 mt-1">Total Hama & Penyakit</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border-2 border-yellow-300">
                  <div className="text-3xl font-bold text-yellow-700">{stats.totalHama}</div>
                  <div className="text-sm text-yellow-600 mt-1">Hama</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-2 border-purple-300">
                  <div className="text-3xl font-bold text-purple-700">{stats.totalPenyakit}</div>
                  <div className="text-sm text-purple-600 mt-1">Penyakit</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-2 border-green-300">
                  <div className="text-3xl font-bold text-green-700">{stats.totalSymptoms}</div>
                  <div className="text-sm text-green-600 mt-1">Total Gejala</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border-2 border-amber-300">
                  <div className="text-3xl font-bold text-amber-700">{stats.totalRules}</div>
                  <div className="text-sm text-amber-600 mt-1">Aturan Diagnosis</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Distribusi Jenis</h3>
                <div className="space-y-3">
                  {['penyakit', 'hama'].map(type => {
                    const count = pisangDiseases.filter(d => d.type === type).length;
                    const percentage = pisangDiseases.length > 0 ? (count / pisangDiseases.length) * 100 : 0;
                    return (
                      <div key={type}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium capitalize">{type}</span>
                          <span className="text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              type === 'penyakit' ? 'bg-purple-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Distribusi Gejala per Kategori</h3>
                <div className="space-y-3">
                  {['akar', 'batang', 'daun', 'buah'].map(category => {
                    const count = pisangSymptoms.filter(s => s.category === category).length;
                    const percentage = pisangSymptoms.length > 0 ? (count / pisangSymptoms.length) * 100 : 0;
                    return (
                      <div key={category}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium capitalize">{category}</span>
                          <span className="text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              category === 'akar' ? 'bg-amber-500' :
                              category === 'batang' ? 'bg-blue-500' :
                              category === 'daun' ? 'bg-green-500' :
                              'bg-yellow-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
              <h3 className="font-bold text-yellow-900 mb-2">Informasi Sistem</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Database mencakup {stats.totalDiseases} jenis hama dan penyakit pisang</li>
                <li>• Sistem menggunakan {stats.totalSymptoms} gejala untuk diagnosis</li>
                <li>• Forward chaining dengan {stats.totalRules} aturan diagnosis</li>
                <li>• Gejala dikategorikan menjadi 4: Akar, Batang, Daun, dan Buah</li>
                <li>• Data disimpan di localStorage browser</li>
              </ul>
            </div>
          </div>
        )}

        {/* Diseases Tab */}
        {activeTab === 'diseases' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Kelola Penyakit & Hama</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => exportToCSV('diseases')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium"
                  >
                    📥 Export CSV
                  </button>
                  <button
                    onClick={() => {
                      setEditingDisease({
                        id: `P${String(pisangDiseases.length + 1).padStart(3, '0')}`,
                        name: '',
                        type: 'penyakit',
                        description: '',
                        cause: '',
                        symptoms: [],
                        prevention: [],
                        control_physical: [],
                        control_chemical: []
                      });
                      setShowDiseaseModal(true);
                    }}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 font-medium"
                  >
                    + Tambah Baru
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {pisangDiseases.map(disease => (
                  <div key={disease.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-yellow-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            disease.type === 'hama' ? 'bg-yellow-100 text-yellow-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {disease.type.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">{disease.id}</span>
                        </div>
                        <h3 className="font-bold text-gray-900">{disease.name}</h3>
                        <p className="text-sm text-gray-700 mt-2">{disease.description}</p>
                        <div className="mt-3 text-xs text-gray-600">
                          <p><span className="font-semibold">Penyebab:</span> {disease.cause}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => {
                            setEditingDisease(disease);
                            setShowDiseaseModal(true);
                          }}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDisease(disease.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Symptoms Tab */}
        {activeTab === 'symptoms' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Kelola Gejala</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => exportToCSV('symptoms')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium"
                  >
                    📥 Export CSV
                  </button>
                  <button
                    onClick={() => {
                      setEditingSymptom({
                        id: `G${String(pisangSymptoms.length + 1).padStart(3, '0')}`,
                        name: '',
                        category: 'daun',
                        description: ''
                      });
                      setShowSymptomModal(true);
                    }}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 font-medium"
                  >
                    + Tambah Gejala
                  </button>
                </div>
              </div>

              {['akar', 'batang', 'daun', 'buah'].map(category => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                    Gejala {category} ({pisangSymptoms.filter(s => s.category === category).length})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {pisangSymptoms
                      .filter(s => s.category === category)
                      .map(symptom => (
                        <div key={symptom.id} className="border-2 border-gray-200 rounded-lg p-3 hover:border-yellow-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-500 font-mono">{symptom.id}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                  category === 'akar' ? 'bg-amber-100 text-amber-700' :
                                  category === 'batang' ? 'bg-blue-100 text-blue-700' :
                                  category === 'daun' ? 'bg-green-100 text-green-700' :
                                  'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {category.toUpperCase()}
                                </span>
                              </div>
                              <h4 className="font-medium text-gray-900 text-sm">{symptom.name}</h4>
                              {symptom.description && (
                                <p className="text-xs text-gray-600 mt-1">{symptom.description}</p>
                              )}
                            </div>
                            <div className="flex gap-1 ml-2">
                              <button
                                onClick={() => {
                                  setEditingSymptom(symptom);
                                  setShowSymptomModal(true);
                                }}
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteSymptom(symptom.id)}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Kelola Aturan Diagnosis</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => exportToCSV('rules')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium"
                  >
                    📥 Export CSV
                  </button>
                  <button
                    onClick={() => {
                      setEditingRule({
                        id: `R${String(pisangRules.length + 1).padStart(3, '0')}`,
                        disease_id: pisangDiseases[0]?.id || '',
                        symptoms: [],
                        confidence: 0.85,
                        min_symptoms: 2
                      });
                      setShowRuleModal(true);
                    }}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 font-medium"
                  >
                    + Tambah Aturan
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {pisangRules.map(rule => {
                  const disease = pisangDiseases.find(d => d.id === rule.disease_id);
                  const confidencePercent = Math.round(rule.confidence * 100);
                  return (
                    <div key={rule.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-yellow-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500 font-mono">{rule.id}</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                              Confidence: {confidencePercent}%
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            IF {rule.symptoms.join(' AND ')}
                          </h3>
                          <p className="text-sm text-gray-700">
                            THEN <span className="font-semibold text-yellow-600">{disease?.name || rule.disease_id}</span>
                          </p>
                          <p className="text-xs text-gray-600 mt-2">
                            Minimal gejala: {rule.min_symptoms} dari {rule.symptoms.length}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => {
                              setEditingRule(rule);
                              setShowRuleModal(true);
                            }}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRule(rule.id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showDiseaseModal && editingDisease && (
        <DiseaseModal
          disease={editingDisease}
          onSave={handleSaveDisease}
          onClose={() => {
            setShowDiseaseModal(false);
            setEditingDisease(null);
          }}
        />
      )}

      {showSymptomModal && editingSymptom && (
        <SymptomModal
          symptom={editingSymptom}
          onSave={handleSaveSymptom}
          onClose={() => {
            setShowSymptomModal(false);
            setEditingSymptom(null);
          }}
        />
      )}

      {showRuleModal && editingRule && (
        <RuleModal
          rule={editingRule}
          diseases={pisangDiseases}
          symptoms={pisangSymptoms}
          onSave={handleSaveRule}
          onClose={() => {
            setShowRuleModal(false);
            setEditingRule(null);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-yellow-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-semibold">Admin Panel - Sistem Pakar Pisang</p>
          <p className="text-yellow-200 text-sm mt-1">Diagnosis Hama & Penyakit Tanaman Pisang</p>
        </div>
      </footer>
    </div>
  );
}

// Disease Modal Component
function DiseaseModal({
  disease,
  onSave,
  onClose
}: {
  disease: PisangDisease;
  onSave: (d: PisangDisease) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(disease);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">
            {disease.id.startsWith('P0') && disease.name === '' ? 'Tambah' : 'Edit'} Penyakit/Hama
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({...formData, id: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                placeholder="P001 atau H001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                placeholder="Nama penyakit/hama"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipe</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as 'penyakit' | 'hama'})}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="penyakit">Penyakit</option>
                <option value="hama">Hama</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Penyebab</label>
              <input
                type="text"
                value={formData.cause}
                onChange={(e) => setFormData({...formData, cause: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                placeholder="Penyebab penyakit/hama"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                rows={3}
                placeholder="Deskripsi lengkap"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => onSave(formData)}
              className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Simpan
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Symptom Modal Component
function SymptomModal({
  symptom,
  onSave,
  onClose
}: {
  symptom: PisangSymptom;
  onSave: (s: PisangSymptom) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(symptom);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-xl w-full">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">
            {symptom.id.startsWith('G0') && symptom.name === '' ? 'Tambah' : 'Edit'} Gejala
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({...formData, id: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                placeholder="G001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nama Gejala</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                placeholder="Nama gejala"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as 'akar' | 'batang' | 'daun' | 'buah'})}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="akar">Akar</option>
                <option value="batang">Batang</option>
                <option value="daun">Daun</option>
                <option value="buah">Buah</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                rows={3}
                placeholder="Deskripsi gejala (opsional)"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => onSave(formData)}
              className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Simpan
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Rule Modal Component
function RuleModal({
  rule,
  diseases,
  symptoms,
  onSave,
  onClose
}: {
  rule: PisangRule;
  diseases: PisangDisease[];
  symptoms: PisangSymptom[];
  onSave: (r: PisangRule) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(rule);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">
            {rule.id.startsWith('R0') && rule.disease_id === '' ? 'Tambah' : 'Edit'} Aturan
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID Aturan</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({...formData, id: e.target.value})}
                className="w-full px-3 py-2 border rounded"
                placeholder="R001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Penyakit/Hama</label>
              <select
                value={formData.disease_id}
                onChange={(e) => setFormData({...formData, disease_id: e.target.value})}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Pilih penyakit/hama</option>
                {diseases.map(d => (
                  <option key={d.id} value={d.id}>{d.id} - {d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Gejala (pisahkan dengan koma, contoh: G001,G002,G003)
              </label>
              <input
                type="text"
                value={formData.symptoms.join(',')}
                onChange={(e) => setFormData({...formData, symptoms: e.target.value.split(',').map(s => s.trim())})}
                className="w-full px-3 py-2 border rounded"
                placeholder="G001,G002,G003"
              />
              <p className="text-xs text-gray-500 mt-1">
                Gejala tersedia: {symptoms.map(s => s.id).join(', ')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confidence (0.0 - 1.0, contoh: 0.85 = 85%)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={formData.confidence}
                onChange={(e) => setFormData({...formData, confidence: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 border rounded"
                placeholder="0.85"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Minimal Gejala Cocok</label>
              <input
                type="number"
                min="1"
                value={formData.min_symptoms}
                onChange={(e) => setFormData({...formData, min_symptoms: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded"
                placeholder="2"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => onSave(formData)}
              className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              Simpan
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
