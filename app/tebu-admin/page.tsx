'use client';

import { useState } from 'react';
import { tebuDiseases } from '../data/tebu-diseases';
import { tebuSymptoms } from '../data/tebu-symptoms';
import { tebuRules } from '../data/tebu-rules';
import Link from 'next/link';

type Tab = 'dashboard' | 'diseases' | 'symptoms' | 'rules';

export default function TebuAdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Simple authentication (in production, use proper auth)
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Password salah!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Panel</h2>
            <p className="text-gray-600">Sistem Pakar Tebu - Pabrik Gula Djatiroto</p>
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-semibold transition-colors"
            >
              Login
            </button>

            <Link
              href="/tebu"
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
    totalDiseases: tebuDiseases.length,
    totalHama: tebuDiseases.filter(d => d.type === 'hama').length,
    totalPenyakit: tebuDiseases.filter(d => d.type === 'penyakit').length,
    totalSymptoms: tebuSymptoms.length,
    totalRules: tebuRules.length,
    highSeverity: tebuDiseases.filter(d => d.severity === 'berat').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-orange-600 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Panel Admin</h1>
              <p className="text-orange-100 mt-1">Sistem Pakar Diagnosis Hama & Penyakit Tebu</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/tebu"
                className="px-4 py-2 bg-orange-700 hover:bg-orange-800 rounded-lg text-sm font-medium transition-colors"
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
              { id: 'diseases' as Tab, label: 'Penyakit & Hama', icon: '🐛' },
              { id: 'symptoms' as Tab, label: 'Gejala', icon: '🔍' },
              { id: 'rules' as Tab, label: 'Aturan', icon: '📋' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-orange-600 text-orange-600'
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
              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-2 border-blue-300">
                  <div className="text-3xl font-bold text-blue-700">{stats.totalDiseases}</div>
                  <div className="text-sm text-blue-600 mt-1">Total Hama & Penyakit</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border-2 border-orange-300">
                  <div className="text-3xl font-bold text-orange-700">{stats.totalHama}</div>
                  <div className="text-sm text-orange-600 mt-1">Hama</div>
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
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border-2 border-red-300">
                  <div className="text-3xl font-bold text-red-700">{stats.highSeverity}</div>
                  <div className="text-sm text-red-600 mt-1">Keparahan Tinggi</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Distribusi Tingkat Keparahan</h3>
                <div className="space-y-3">
                  {['berat', 'sedang', 'ringan'].map(severity => {
                    const count = tebuDiseases.filter(d => d.severity === severity).length;
                    const percentage = (count / tebuDiseases.length) * 100;
                    return (
                      <div key={severity}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium capitalize">{severity}</span>
                          <span className="text-gray-600">{count} ({percentage.toFixed(0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              severity === 'berat' ? 'bg-red-500' :
                              severity === 'sedang' ? 'bg-yellow-500' :
                              'bg-blue-500'
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
                  {['akar', 'batang', 'daun'].map(category => {
                    const count = tebuSymptoms.filter(s => s.category === category).length;
                    const percentage = (count / tebuSymptoms.length) * 100;
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
                              'bg-green-500'
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

            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-2">Informasi Sistem</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Database mencakup {stats.totalDiseases} jenis hama dan penyakit tebu</li>
                <li>• Sistem menggunakan {stats.totalSymptoms} gejala untuk diagnosis</li>
                <li>• Forward chaining dengan {stats.totalRules} aturan diagnosis</li>
                <li>• Gejala dikategorikan menjadi 3: Akar, Batang, dan Daun</li>
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
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 font-medium">
                  + Tambah Baru
                </button>
              </div>

              <div className="space-y-3">
                {tebuDiseases.map(disease => (
                  <div key={disease.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            disease.type === 'hama' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {disease.type.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            disease.severity === 'berat' ? 'bg-red-100 text-red-700' :
                            disease.severity === 'sedang' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {disease.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500 font-mono">{disease.code}</span>
                        </div>
                        <h3 className="font-bold text-gray-900">{disease.name}</h3>
                        {disease.latinName && (
                          <p className="text-sm text-gray-600 italic">({disease.latinName})</p>
                        )}
                        <p className="text-sm text-gray-700 mt-2">{disease.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium">
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
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 font-medium">
                  + Tambah Gejala
                </button>
              </div>

              {['akar', 'batang', 'daun'].map(category => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                    Gejala {category} ({tebuSymptoms.filter(s => s.category === category).length})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {tebuSymptoms
                      .filter(s => s.category === category)
                      .map(symptom => (
                        <div key={symptom.id} className="border-2 border-gray-200 rounded-lg p-3 hover:border-orange-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-500 font-mono">{symptom.code}</span>
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                  category === 'akar' ? 'bg-amber-100 text-amber-700' :
                                  category === 'batang' ? 'bg-blue-100 text-blue-700' :
                                  'bg-green-100 text-green-700'
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
                              <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">
                                Edit
                              </button>
                              <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs">
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
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 font-medium">
                  + Tambah Aturan
                </button>
              </div>

              <div className="space-y-3">
                {tebuRules.map(rule => {
                  const disease = tebuDiseases.find(d => d.id === rule.diseaseId);
                  return (
                    <div key={rule.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-500 font-mono">{rule.id}</span>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                              Confidence: {rule.confidence}%
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1">
                            IF {rule.symptoms.join(' AND ')}
                          </h3>
                          <p className="text-sm text-gray-700">
                            THEN <span className="font-semibold text-orange-600">{disease?.name || rule.diseaseId}</span>
                          </p>
                          <p className="text-xs text-gray-600 mt-2">
                            Minimal gejala: {rule.minSymptoms || 1} dari {rule.symptoms.length}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium">
                            Edit
                          </button>
                          <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium">
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

      {/* Footer */}
      <footer className="bg-orange-800 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-semibold">Admin Panel - Sistem Pakar Tebu</p>
          <p className="text-orange-200 text-sm mt-1">Pabrik Gula Djatiroto</p>
        </div>
      </footer>
    </div>
  );
}
