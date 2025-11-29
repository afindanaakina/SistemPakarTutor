'use client';

import { useState } from 'react';
import { tebuSymptoms } from '../data/tebu-symptoms';
import { tebuDiseases } from '../data/tebu-diseases';
import { tebuRules } from '../data/tebu-rules';
import { TebuDiagnosisEngine } from '../lib/tebu-diagnosis-engine';
import { DiagnosisResult } from '../types/tebu';
import Link from 'next/link';

export default function TebuKonsultasiPage() {
  const [step, setStep] = useState<'intro' | 'symptoms' | 'results'>('intro');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<DiagnosisResult[]>([]);
  const [userName, setUserName] = useState('');

  const engine = new TebuDiagnosisEngine(tebuDiseases, tebuSymptoms, tebuRules);
  const symptomsByCategory = engine.getSymptomsByCategory();

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleDiagnose = () => {
    if (selectedSymptoms.length === 0) {
      alert('Mohon pilih minimal 1 gejala yang terlihat pada tanaman tebu Anda');
      return;
    }

    const diagnosisResults = engine.diagnose(selectedSymptoms);
    setResults(diagnosisResults);
    setStep('results');

    // Save to history (will implement later)
    const history = {
      date: new Date(),
      userName,
      symptoms: selectedSymptoms,
      results: diagnosisResults
    };
    console.log('Saving to history:', history);
  };

  const resetConsultation = () => {
    setStep('intro');
    setSelectedSymptoms([]);
    setResults([]);
    setUserName('');
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-green-900 text-white py-6 md:py-10 border-b-4 md:border-b-8 border-amber-700">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <Link href="/tebu" className="text-amber-200 hover:text-white text-base md:text-xl mb-3 md:mb-4 inline-block font-bold">
            ← KEMBALI
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-2 md:mb-3">KONSULTASI DIAGNOSIS</h1>
          <p className="text-lg md:text-2xl text-amber-100 text-center">Sistem Pakar Hama dan Penyakit Tebu</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Intro Step */}
        {step === 'intro' && (
          <div className="max-w-4xl mx-auto">
            {/* Gambar Petani Tebu */}
            <div className="mb-6 md:mb-8 border-4 md:border-8 border-green-900 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop" 
                alt="Petani Tebu"
                className="w-full h-40 md:h-64 object-cover"
              />
            </div>

            <div className="bg-white border-4 border-green-900 p-6 md:p-10">
              <h2 className="text-2xl md:text-4xl font-bold text-green-900 mb-4 md:mb-6 text-center">
                Selamat Datang
              </h2>
              <p className="text-lg md:text-2xl text-gray-700 mb-6 md:mb-8 text-center leading-relaxed">
                Sistem ini akan membantu Bapak/Ibu mengetahui jenis hama atau penyakit 
                yang menyerang tanaman tebu
              </p>

              <div className="bg-amber-100 border-4 border-amber-600 p-4 md:p-8 mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-amber-900 mb-3 md:mb-4">Cara Menggunakan:</h3>
                <div className="space-y-2 md:space-y-3 text-base md:text-xl text-gray-800">
                  <div className="flex items-start">
                    <span className="font-bold mr-3">1.</span>
                    <span>Amati kondisi tanaman tebu Anda</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold mr-3">2.</span>
                    <span>Centang gejala yang terlihat</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold mr-3">3.</span>
                    <span>Klik tombol "PROSES DIAGNOSIS"</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold mr-3">4.</span>
                    <span>Lihat hasil dan cara mengatasinya</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <label className="block text-lg md:text-xl font-bold text-gray-700 mb-2 md:mb-3">
                  Nama Anda (tidak wajib):
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Tulis nama Anda di sini"
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-4 border-gray-400 text-lg md:text-xl focus:border-green-800 focus:outline-none"
                />
              </div>

              <button
                onClick={() => setStep('symptoms')}
                className="w-full bg-green-800 text-white px-6 md:px-8 py-4 md:py-6 text-xl md:text-2xl font-bold border-4 border-green-900 hover:bg-green-700"
              >
                MULAI KONSULTASI
              </button>
            </div>
          </div>
        )}

        {/* Symptoms Selection Step */}
        {step === 'symptoms' && (
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white border-4 border-green-900 p-4 md:p-8 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-green-900 mb-3 md:mb-4 text-center">
                Pilih Gejala yang Terlihat
              </h2>
              <p className="text-lg md:text-2xl text-gray-700 mb-4 md:mb-6 text-center">
                Centang SEMUA gejala yang Anda lihat pada tanaman tebu
              </p>
              <div className="bg-amber-100 border-4 border-amber-600 p-4 md:p-6 text-center">
                <p className="text-xl md:text-2xl font-bold text-amber-900">
                  Gejala Terpilih: {selectedSymptoms.length}
                </p>
                <p className="text-base md:text-xl text-gray-700 mt-2">
                  {selectedSymptoms.length < 2 ? 'Pilih minimal 2 gejala' : 'Sudah cukup untuk diagnosis'}
                </p>
              </div>
            </div>

            {/* Gejala Akar */}
            <div className="bg-white border-4 border-amber-700 p-4 md:p-8">
              <div className="mb-4 md:mb-6 border-4 border-amber-600 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=200&fit=crop" 
                  alt="Akar Tanaman"
                  className="w-full h-32 md:h-40 object-cover"
                />
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-amber-900 mb-4 md:mb-6 text-center">
                BAGIAN 1: GEJALA PADA AKAR
              </h3>
              <div className="space-y-3 md:space-y-4">
                {symptomsByCategory.akar.map(symptom => (
                  <label
                    key={symptom.id}
                    className={`flex items-start p-4 md:p-6 border-4 cursor-pointer ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'border-green-800 bg-green-100'
                        : 'border-gray-400 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom.id)}
                      onChange={() => toggleSymptom(symptom.id)}
                      className="mt-1 mr-3 md:mr-4 w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="text-base md:text-xl font-bold text-gray-900 mb-1">{symptom.name}</div>
                      <div className="text-sm md:text-lg text-gray-700">{symptom.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Gejala Batang */}
            <div className="bg-white border-4 border-blue-700 p-4 md:p-8">
              <div className="mb-4 md:mb-6 border-4 border-blue-600 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1592921870583-01a3bb9b4f15?w=800&h=200&fit=crop" 
                  alt="Batang Tebu"
                  className="w-full h-32 md:h-40 object-cover"
                />
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-blue-900 mb-4 md:mb-6 text-center">
                BAGIAN 2: GEJALA PADA BATANG
              </h3>
              <div className="space-y-3 md:space-y-4">
                {symptomsByCategory.batang.map(symptom => (
                  <label
                    key={symptom.id}
                    className={`flex items-start p-4 md:p-6 border-4 cursor-pointer ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'border-green-800 bg-green-100'
                        : 'border-gray-400 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom.id)}
                      onChange={() => toggleSymptom(symptom.id)}
                      className="mt-1 mr-3 md:mr-4 w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="text-base md:text-xl font-bold text-gray-900 mb-1">{symptom.name}</div>
                      <div className="text-sm md:text-lg text-gray-700">{symptom.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Gejala Daun */}
            <div className="bg-white border-4 border-green-700 p-4 md:p-8">
              <div className="mb-4 md:mb-6 border-4 border-green-600 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1616680214084-22670ec97171?w=800&h=200&fit=crop" 
                  alt="Daun Tebu"
                  className="w-full h-32 md:h-40 object-cover"
                />
              </div>
              <h3 className="text-xl md:text-3xl font-bold text-green-900 mb-4 md:mb-6 text-center">
                BAGIAN 3: GEJALA PADA DAUN
              </h3>
              <div className="space-y-3 md:space-y-4">
                {symptomsByCategory.daun.map(symptom => (
                  <label
                    key={symptom.id}
                    className={`flex items-start p-4 md:p-6 border-4 cursor-pointer ${
                      selectedSymptoms.includes(symptom.id)
                        ? 'border-green-800 bg-green-100'
                        : 'border-gray-400 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSymptoms.includes(symptom.id)}
                      onChange={() => toggleSymptom(symptom.id)}
                      className="mt-1 mr-3 md:mr-4 w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="text-base md:text-xl font-bold text-gray-900 mb-1">{symptom.name}</div>
                      <div className="text-sm md:text-lg text-gray-700">{symptom.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <button
                onClick={() => setStep('intro')}
                className="px-4 md:px-8 py-4 md:py-6 border-4 border-gray-600 bg-white hover:bg-gray-100 font-bold text-base md:text-xl"
              >
                ← KEMBALI
              </button>
              <button
                onClick={handleDiagnose}
                className="px-4 md:px-8 py-4 md:py-6 bg-green-800 text-white border-4 border-green-900 hover:bg-green-700 font-bold text-lg md:text-2xl"
              >
                PROSES DIAGNOSIS →
              </button>
            </div>
          </div>
        )}

        {/* Results Step */}
        {step === 'results' && (
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white border-4 border-green-900 p-4 md:p-8 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-green-900 mb-3 md:mb-4">
                HASIL DIAGNOSIS
              </h2>
              <p className="text-lg md:text-2xl text-gray-700">
                Berdasarkan {selectedSymptoms.length} gejala yang Anda pilih:
              </p>
            </div>

            {results.length === 0 ? (
              <div className="bg-yellow-100 border-4 border-yellow-600 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-yellow-900 mb-2 md:mb-3 text-center">Tidak Ditemukan Diagnosis</h3>
                <p className="text-base md:text-xl text-gray-800 text-center">
                  Gejala yang Anda pilih tidak cocok dengan data dalam sistem. 
                  Silakan coba lagi atau hubungi petugas pertanian.
                </p>
              </div>
            ) : (
              results.map((result, index) => (
                <div
                  key={result.disease.id}
                  className={`bg-white ${
                    index === 0 ? 'border-8 border-green-800' : 'border-4 border-gray-500'
                  }`}
                >
                  {index === 0 && (
                    <div className="bg-green-800 text-white px-6 py-4">
                      <p className="text-2xl font-bold text-center">DIAGNOSIS PALING COCOK</p>
                    </div>
                  )}
                  
                  {result.disease.imageUrl && (
                    <div className="border-b-4 border-gray-300">
                      <img 
                        src={result.disease.imageUrl} 
                        alt={result.disease.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="text-center mb-6 pb-6 border-b-4 border-gray-300">
                      <div className="flex items-center justify-center gap-4 mb-3">
                        <span className={`px-4 py-2 border-4 text-lg font-bold ${
                          result.disease.type === 'hama' 
                            ? 'border-orange-600 bg-orange-100 text-orange-900' 
                            : 'border-purple-600 bg-purple-100 text-purple-900'
                        }`}>
                          {result.disease.type === 'hama' ? 'HAMA' : 'PENYAKIT'}
                        </span>
                        <span className={`px-4 py-2 border-4 text-lg font-bold ${
                          result.disease.severity === 'berat' ? 'border-red-600 bg-red-100 text-red-900' :
                          result.disease.severity === 'sedang' ? 'border-yellow-600 bg-yellow-100 text-yellow-900' :
                          'border-blue-600 bg-blue-100 text-blue-900'
                        }`}>
                          TINGKAT: {result.disease.severity.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-4xl font-bold text-green-900 mb-2">
                        {result.disease.name}
                      </h3>
                      {result.disease.latinName && (
                        <p className="text-xl text-gray-600 italic">({result.disease.latinName})</p>
                      )}
                      <div className="mt-4 inline-block px-8 py-3 bg-green-800 text-white">
                        <div className="text-4xl font-bold">{result.confidence}%</div>
                        <div className="text-lg">Tingkat Keyakinan</div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-amber-50 border-l-8 border-amber-600 p-6">
                        <h4 className="text-2xl font-bold text-amber-900 mb-3">Deskripsi:</h4>
                        <p className="text-xl text-gray-800">{result.disease.description}</p>
                      </div>

                      <div className="bg-red-50 border-l-8 border-red-600 p-6">
                        <h4 className="text-2xl font-bold text-red-900 mb-3">Penyebab:</h4>
                        <p className="text-xl text-gray-800">{result.disease.causes}</p>
                      </div>

                      <div className="bg-green-50 border-l-8 border-green-600 p-6">
                        <h4 className="text-2xl font-bold text-green-900 mb-3">Cara Penanganan:</h4>
                        <div className="space-y-3">
                          {result.disease.solutions.map((solution, i) => (
                            <div key={i} className="flex items-start">
                              <span className="text-xl font-bold mr-3">{i + 1}.</span>
                              <span className="text-xl text-gray-800">{solution}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-blue-50 border-l-8 border-blue-600 p-6">
                        <h4 className="text-2xl font-bold text-blue-900 mb-3">Pencegahan:</h4>
                        <div className="space-y-3">
                          {result.disease.prevention.map((prev, i) => (
                            <div key={i} className="flex items-start">
                              <span className="text-xl font-bold mr-3">•</span>
                              <span className="text-xl text-gray-800">{prev}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {!result.allSymptomsMatched && (
                        <div className="bg-yellow-100 border-4 border-yellow-600 p-6">
                          <p className="text-lg text-gray-800 text-center">
                            <strong className="text-xl">CATATAN:</strong> Diagnosis berdasarkan kecocokan sebagian gejala. 
                            Untuk kepastian, konsultasikan dengan petugas pertanian.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <button
                onClick={resetConsultation}
                className="px-6 md:px-8 py-4 md:py-6 bg-green-800 text-white border-4 border-green-900 hover:bg-green-700 font-bold text-lg md:text-2xl"
              >
                KONSULTASI BARU
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 md:px-8 py-4 md:py-6 border-4 border-green-800 bg-white text-green-900 hover:bg-green-50 font-bold text-lg md:text-2xl"
              >
                CETAK HASIL
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-6 md:py-12 border-t-4 md:border-t-8 border-amber-700">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xl md:text-2xl font-bold mb-2 md:mb-3">SISTEM PAKAR TEBU</p>
          <p className="text-base md:text-xl text-amber-100 mb-1 md:mb-2">Pabrik Gula Djatiroto</p>
          <p className="text-sm md:text-lg text-green-200">Diagnosis Hama dan Penyakit Tanaman Tebu</p>
        </div>
      </footer>
    </div>
  );
}
