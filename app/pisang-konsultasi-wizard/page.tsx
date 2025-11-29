'use client';

import { useState } from 'react';
import Link from 'next/link';
import { pisangSymptoms, symptomCategories } from '../data/pisang-symptoms';
import { pisangEngine } from '../lib/pisang-diagnosis-engine';

type WizardStep = 'intro' | 'akar' | 'batang' | 'daun' | 'buah' | 'result';

export default function PisangKonsultasiWizardPage() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('intro');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptomId)) {
        return prev.filter(id => id !== symptomId);
      } else {
        return [...prev, symptomId];
      }
    });
  };

  const handleNext = (nextStep: WizardStep) => {
    if (nextStep === 'result') {
      const diagnosisResults = pisangEngine.diagnose(selectedSymptoms);
      setResults(diagnosisResults);
    }
    setCurrentStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setCurrentStep('intro');
    setResults([]);
  };

  const stepOrder: WizardStep[] = ['intro', 'akar', 'batang', 'daun', 'buah', 'result'];
  const currentStepIndex = stepOrder.indexOf(currentStep);
  const progress = ((currentStepIndex) / (stepOrder.length - 1)) * 100;

  // Intro Step
  if (currentStep === 'intro') {
    return (
      <div className="min-h-screen bg-yellow-50">
        <div className="bg-yellow-800 border-b-4 md:border-b-8 border-yellow-900 py-6">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-yellow-50 uppercase">
              KONSULTASI DIAGNOSIS PENYAKIT PISANG
            </h1>
            <p className="text-center text-yellow-100 text-base md:text-lg mt-2">
              Panduan Step-by-Step untuk Diagnosis yang Akurat
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white border-4 md:border-8 border-yellow-900 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-900 uppercase text-center mb-6">
              SELAMAT DATANG
            </h2>

            <div className="space-y-6">
              <div className="bg-yellow-50 border-4 border-yellow-700 p-6">
                <h3 className="text-xl font-bold text-yellow-900 mb-3">CARA PENGGUNAAN:</h3>
                <ol className="space-y-3 text-base md:text-lg text-gray-700">
                  <li className="flex gap-3">
                    <span className="bg-yellow-700 text-yellow-50 px-3 py-1 font-bold flex-shrink-0">1</span>
                    <span>Anda akan ditanya tentang gejala pada <strong>4 bagian tanaman</strong>: Akar, Batang, Daun, dan Buah</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-yellow-700 text-yellow-50 px-3 py-1 font-bold flex-shrink-0">2</span>
                    <span>Setiap bagian ada di <strong>halaman terpisah</strong> untuk fokus lebih baik</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-yellow-700 text-yellow-50 px-3 py-1 font-bold flex-shrink-0">3</span>
                    <span>Pilih <strong>SEMUA gejala</strong> yang Anda lihat pada tanaman</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-yellow-700 text-yellow-50 px-3 py-1 font-bold flex-shrink-0">4</span>
                    <span>Klik <strong>"LANJUT"</strong> untuk ke bagian berikutnya</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-yellow-700 text-yellow-50 px-3 py-1 font-bold flex-shrink-0">5</span>
                    <span>Di akhir, sistem akan memberikan <strong>diagnosis dan saran</strong></span>
                  </li>
                </ol>
              </div>

              <div className="bg-amber-50 border-l-8 border-amber-600 p-6">
                <p className="text-lg text-gray-700">
                  <strong>💡 Tips:</strong> Semakin banyak gejala yang Anda pilih dengan tepat, 
                  semakin akurat diagnosis yang diberikan sistem.
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => handleNext('akar')}
                className="bg-yellow-700 text-yellow-50 px-8 md:px-12 py-4 md:py-6 text-xl md:text-2xl font-bold border-4 md:border-8 border-yellow-900 hover:bg-yellow-800 uppercase"
              >
                MULAI KONSULTASI →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Category Steps (akar, batang, daun, buah)
  if (currentStep !== 'result') {
    const category = symptomCategories.find(c => c.id === currentStep);
    const categorySymptoms = pisangSymptoms.filter(s => s.category === currentStep);
    const selectedInCategory = categorySymptoms.filter(s => selectedSymptoms.includes(s.id)).length;

    const nextStepMap: Record<string, WizardStep> = {
      akar: 'batang',
      batang: 'daun',
      daun: 'buah',
      buah: 'result'
    };

    const prevStepMap: Record<string, WizardStep> = {
      akar: 'intro',
      batang: 'akar',
      daun: 'batang',
      buah: 'daun'
    };

    return (
      <div className="min-h-screen bg-yellow-50">
        {/* Progress Bar */}
        <div className="bg-yellow-800 border-b-4 border-yellow-900">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-100 text-sm font-bold">LANGKAH {currentStepIndex} dari 4</span>
              <span className="text-yellow-100 text-sm font-bold">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-yellow-900 h-3 border-2 border-yellow-950">
              <div 
                className="bg-yellow-400 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
          <div className="bg-white border-4 md:border-8 border-yellow-900 p-4 md:p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-yellow-900 uppercase mb-2">
                {category?.name}
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Pilih semua gejala yang terlihat pada bagian ini
              </p>
              <div className="mt-3 inline-block bg-yellow-700 text-yellow-50 px-6 py-2 font-bold border-4 border-yellow-900">
                {selectedInCategory} GEJALA DIPILIH
              </div>
            </div>

            {/* Symptoms */}
            <div className="grid grid-cols-1 gap-3 md:gap-4 mb-6">
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
                    <label className="flex items-start gap-3 md:gap-4 p-4 md:p-5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSymptomToggle(symptom.id)}
                        className="mt-1 w-6 h-6 flex-shrink-0"
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
                          Kode: {symptom.id}
                        </span>
                      </div>
                      {symptom.imageUrl && (
                        <a
                          href={symptom.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`flex-shrink-0 px-3 py-2 text-xs md:text-sm font-bold border-2 transition-colors ${
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

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t-4 border-yellow-800">
              <button
                onClick={() => handleNext(prevStepMap[currentStep])}
                className="sm:w-auto bg-white text-yellow-900 px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold border-4 border-yellow-900 hover:bg-yellow-50 uppercase"
              >
                ← KEMBALI
              </button>
              <button
                onClick={() => handleNext(nextStepMap[currentStep])}
                className="flex-1 bg-yellow-700 text-yellow-50 px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold border-4 border-yellow-900 hover:bg-yellow-800 uppercase"
              >
                {currentStep === 'buah' ? 'LIHAT HASIL →' : 'LANJUT →'}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 bg-yellow-100 border-4 border-yellow-700 p-4 text-center">
            <p className="text-base md:text-lg font-bold text-yellow-900">
              Total Gejala Dipilih: {selectedSymptoms.length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Result Step
  return (
    <div className="min-h-screen bg-yellow-50">
      <div className="bg-yellow-800 border-b-4 md:border-b-8 border-yellow-900 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-yellow-50 uppercase">
            HASIL DIAGNOSIS
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {results.length === 0 ? (
          <div className="bg-white border-4 md:border-8 border-yellow-900 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
              TIDAK DITEMUKAN DIAGNOSIS
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Gejala yang dipilih ({selectedSymptoms.length}) tidak cocok dengan penyakit dalam database.
            </p>
            <button
              onClick={handleReset}
              className="bg-yellow-700 text-yellow-50 px-8 py-4 text-xl font-bold border-4 border-yellow-900 hover:bg-yellow-800 uppercase"
            >
              KONSULTASI ULANG
            </button>
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
                  <div className="bg-yellow-700 p-4 md:p-6 border-b-4 md:border-b-8 border-yellow-900">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-yellow-50 text-yellow-900 px-3 py-1 text-lg font-bold border-4 border-yellow-900">
                            #{index + 1}
                          </span>
                          <span className="bg-yellow-900 text-yellow-50 px-3 py-1 text-xs font-bold uppercase">
                            {disease.type === 'penyakit' ? 'PENYAKIT' : 'HAMA'}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-yellow-50 uppercase">
                          {disease.name}
                        </h3>
                      </div>
                      <div className="md:text-right">
                        <div className="bg-yellow-50 border-4 border-yellow-900 p-3">
                          <div className="text-2xl md:text-3xl font-bold text-yellow-900">{confidencePercent}</div>
                          <div className="text-xs font-bold text-gray-700 uppercase">{confidenceCategory.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 md:p-6 space-y-4">
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

                    <div>
                      <h4 className="text-lg font-bold text-yellow-900 uppercase mb-2 border-b-4 border-yellow-700 pb-2">
                        PENYEBAB
                      </h4>
                      <p className="text-base text-gray-700">{disease.cause}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-yellow-900 uppercase mb-2 border-b-4 border-yellow-700 pb-2">
                        CARA PENCEGAHAN
                      </h4>
                      <ul className="space-y-2">
                        {disease.prevention.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-base">
                            <span className="bg-yellow-700 text-yellow-50 px-2 py-1 font-bold text-xs flex-shrink-0">
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

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleReset}
                className="flex-1 bg-yellow-700 text-yellow-50 px-6 py-4 text-lg font-bold border-4 border-yellow-900 hover:bg-yellow-800 uppercase"
              >
                KONSULTASI ULANG
              </button>
              <Link 
                href={`/pisang-daftar`}
                className="flex-1 text-center bg-white text-yellow-900 px-6 py-4 text-lg font-bold border-4 border-yellow-900 hover:bg-yellow-50 uppercase"
              >
                LIHAT DETAIL LENGKAP
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
