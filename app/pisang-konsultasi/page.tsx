'use client';

import { useState } from 'react';
import Link from 'next/link';
import { pisangSymptoms, symptomCategories } from '../data/pisang-symptoms';
import { pisangEngine } from '../lib/pisang-diagnosis-engine';

export default function PisangKonsultasiPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomId)) {
        return prev.filter(id => id !== symptomId);
      } else {
        return [...prev, symptomId];
      }
    });
    setShowResults(false);
  };

  const handleDiagnose = () => {
    if (selectedSymptoms.length === 0) {
      alert('Pilih minimal 1 gejala terlebih dahulu');
      return;
    }

    const diagnosisResults = pisangEngine.diagnose(selectedSymptoms);
    setResults(diagnosisResults);
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setShowResults(false);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <div className="bg-yellow-800 border-b-8 border-yellow-900 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-50 uppercase">
            KONSULTASI PENYAKIT PISANG
          </h1>
          <p className="text-center text-yellow-100 text-lg mt-2">
            Pilih gejala yang terlihat pada tanaman pisang Anda
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Hasil Diagnosis */}
        {showResults && (
          <div className="mb-8">
            <div className="bg-white border-8 border-yellow-900 p-6">
              <h2 className="text-3xl font-bold text-yellow-900 uppercase text-center mb-6 border-b-4 border-yellow-800 pb-4">
                HASIL DIAGNOSIS
              </h2>

              {results.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-2xl text-gray-700 mb-4">
                    Tidak ditemukan penyakit yang cocok dengan gejala yang dipilih.
                  </p>
                  <p className="text-lg text-gray-600">
                    Coba pilih lebih banyak gejala atau konsultasikan dengan petugas penyuluh pertanian.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {results.map((result, index) => {
                    const disease = pisangEngine.getDiseaseDetail(result.disease_id);
                    if (!disease) return null;

                    const confidenceCategory = pisangEngine.getConfidenceCategory(result.confidence);
                    const confidencePercent = pisangEngine.formatConfidence(result.confidence);

                    return (
                      <div key={result.disease_id} className="border-4 md:border-8 border-yellow-800 bg-yellow-50">
                        {/* Header Hasil */}
                        <div className="bg-yellow-700 p-4 md:p-6 border-b-4 md:border-b-8 border-yellow-900">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                                <span className="bg-yellow-50 text-yellow-900 px-3 md:px-4 py-1 md:py-2 text-lg md:text-xl font-bold border-4 border-yellow-900">
                                  #{index + 1}
                                </span>
                                <span className="bg-yellow-900 text-yellow-50 px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-bold uppercase">
                                  {disease.type === 'penyakit' ? 'PENYAKIT' : 'HAMA'}
                                </span>
                              </div>
                              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-50 uppercase">
                                {disease.name}
                              </h3>
                            </div>
                            <div className="md:text-right">
                              <div className="bg-yellow-50 border-4 border-yellow-900 p-3 md:p-4">
                                <div className="text-2xl md:text-3xl font-bold text-yellow-900">{confidencePercent}</div>
                                <div className="text-xs md:text-sm font-bold text-gray-700 uppercase">{confidenceCategory.label}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Detail Penyakit */}
                        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                          {/* Image */}
                          {disease.image && (
                            <div>
                              <a
                                href={disease.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block relative h-32 md:h-40 bg-yellow-200 border-4 border-yellow-700 hover:border-yellow-900 transition-colors group"
                                title="Klik untuk lihat gambar lebih besar"
                              >
                                <div className="absolute inset-0 flex items-center justify-center bg-yellow-100">
                                  <span className="text-gray-500 text-sm">Gambar {disease.name}</span>
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                                  <span className="bg-yellow-700 text-yellow-50 px-4 py-2 font-bold border-2 border-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                                    🔍 LIHAT GAMBAR
                                  </span>
                                </div>
                              </a>
                            </div>
                          )}

                          {/* Penyebab */}
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                              PENYEBAB
                            </h4>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">{disease.cause}</p>
                          </div>

                          {/* Deskripsi */}
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                              KETERANGAN
                            </h4>
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">{disease.description}</p>
                          </div>

                          {/* Gejala yang Cocok */}
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                              GEJALA YANG COCOK ({result.matched_symptoms.length} dari {result.total_symptoms})
                            </h4>
                            <ul className="space-y-2">
                              {disease.symptoms.map((symptom, idx) => (
                                <li key={idx} className="flex items-start gap-2 md:gap-3 text-base md:text-lg">
                                  <span className="text-yellow-700 font-bold">•</span>
                                  <span className="text-gray-700">{symptom}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pencegahan */}
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                              CARA PENCEGAHAN
                            </h4>
                            <ul className="space-y-2">
                              {disease.prevention.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 md:gap-3 text-base md:text-lg">
                                  <span className="bg-yellow-700 text-yellow-50 px-2 py-1 font-bold text-xs md:text-sm flex-shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pengendalian Fisik */}
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                              PENGENDALIAN FISIK (TANPA OBAT)
                            </h4>
                            <ul className="space-y-2">
                              {disease.control_physical.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 md:gap-3 text-base md:text-lg">
                                  <span className="bg-yellow-700 text-yellow-50 px-2 py-1 font-bold text-xs md:text-sm flex-shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pengendalian Kimia */}
                          <div>
                            <h4 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                              PENGENDALIAN KIMIA (DENGAN PESTISIDA)
                            </h4>
                            <ul className="space-y-2">
                              {disease.control_chemical.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 md:gap-3 text-base md:text-lg">
                                  <span className="bg-yellow-700 text-yellow-50 px-2 py-1 font-bold text-xs md:text-sm flex-shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Tombol Konsultasi Lagi */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleReset}
                  className="bg-yellow-800 text-yellow-50 px-8 py-4 text-xl font-bold border-4 border-yellow-900 hover:bg-yellow-900 uppercase"
                >
                  KONSULTASI LAGI
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pilihan Gejala */}
        {!showResults && (
          <>
            <div className="bg-white border-4 md:border-8 border-yellow-900 p-4 md:p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 md:mb-6 border-b-4 border-yellow-800 pb-4">
                <h2 className="text-xl md:text-2xl font-bold text-yellow-900 uppercase">
                  PILIH GEJALA
                </h2>
                <div className="bg-yellow-700 text-yellow-50 px-4 md:px-6 py-2 md:py-3 text-lg md:text-xl font-bold border-4 border-yellow-900 text-center">
                  {selectedSymptoms.length} GEJALA DIPILIH
                </div>
              </div>

              {symptomCategories.map((category) => {
                const categorySymptoms = pisangSymptoms.filter(s => s.category === category.id);
                
                return (
                  <div key={category.id} className="mb-6 md:mb-8">
                    <h3 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-3 md:mb-4 bg-yellow-100 border-4 border-yellow-700 p-3 md:p-4">
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {categorySymptoms.map((symptom) => {
                        const isSelected = selectedSymptoms.includes(symptom.id);
                        return (
                          <div
                            key={symptom.id}
                            className={`border-4 transition-colors ${
                              isSelected
                                ? 'bg-yellow-700 border-yellow-900'
                                : 'bg-yellow-50 border-yellow-700'
                            }`}
                          >
                            <label className="flex items-start gap-3 md:gap-4 p-4 md:p-6 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleSymptomToggle(symptom.id)}
                                className="mt-1 w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                              />
                              <div className="flex-1">
                                <span className={`text-base md:text-lg font-bold block ${isSelected ? 'text-yellow-50' : 'text-gray-700'}`}>
                                  {symptom.name}
                                </span>
                                {symptom.description && (
                                  <span className={`text-xs md:text-sm block mt-1 ${isSelected ? 'text-yellow-200' : 'text-gray-600'}`}>
                                    {symptom.description}
                                  </span>
                                )}
                                <span className={`text-xs md:text-sm ${isSelected ? 'text-yellow-200' : 'text-gray-600'}`}>
                                  {symptom.id}
                                </span>
                              </div>
                              {symptom.imageUrl && (
                                <a
                                  href={symptom.imageUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className={`flex-shrink-0 px-2 md:px-3 py-1 md:py-2 text-xs font-bold border-2 transition-colors ${
                                    isSelected
                                      ? 'bg-yellow-50 text-yellow-900 border-yellow-900 hover:bg-yellow-100'
                                      : 'bg-yellow-700 text-yellow-50 border-yellow-900 hover:bg-yellow-800'
                                  }`}
                                  title="Lihat gambar referensi"
                                >
                                  🖼️ GAMBAR
                                </a>
                              )}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8">
              <button
                onClick={handleDiagnose}
                disabled={selectedSymptoms.length === 0}
                className="flex-1 bg-yellow-700 text-yellow-50 px-6 md:px-8 py-4 md:py-6 text-lg md:text-2xl font-bold border-4 md:border-8 border-yellow-900 hover:bg-yellow-800 disabled:bg-gray-400 disabled:border-gray-600 uppercase"
              >
                DIAGNOSA SEKARANG
              </button>
              <button
                onClick={handleReset}
                className="sm:w-auto bg-white text-yellow-900 px-6 md:px-8 py-4 md:py-6 text-lg md:text-2xl font-bold border-4 md:border-8 border-yellow-900 hover:bg-yellow-50 uppercase"
              >
                ULANG
              </button>
            </div>
          </>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Link href="/pisang" className="inline-block bg-yellow-800 text-yellow-50 px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold border-4 border-yellow-900 hover:bg-yellow-900 uppercase">
            KEMBALI
          </Link>
        </div>
      </div>
    </div>
  );
}
