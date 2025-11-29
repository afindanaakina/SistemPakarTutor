'use client';

import { useState } from 'react';
import { tebuDiseases } from '../data/tebu-diseases';
import { tebuSymptoms } from '../data/tebu-symptoms';
import Link from 'next/link';

export default function TebuDaftarPage() {
  const [filter, setFilter] = useState<'semua' | 'hama' | 'penyakit'>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDiseases = tebuDiseases.filter(disease => {
    const matchesFilter = filter === 'semua' || disease.type === filter;
    const matchesSearch = disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          disease.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSymptomName = (symptomId: string) => {
    return tebuSymptoms.find(s => s.id === symptomId)?.name || symptomId;
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <div className="bg-green-900 text-white py-6 md:py-10 border-b-4 md:border-b-8 border-amber-700">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <Link href="/tebu" className="text-amber-200 hover:text-white text-base md:text-xl mb-3 md:mb-4 inline-block font-bold">
            ← KEMBALI
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-2 md:mb-3">DAFTAR HAMA & PENYAKIT TEBU</h1>
          <p className="text-lg md:text-2xl text-amber-100 text-center">Informasi Lengkap 32 Jenis Hama dan Penyakit</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Search and Filter */}
        <div className="bg-white border-4 border-green-900 p-4 md:p-8 mb-6 md:mb-8">
          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-lg md:text-2xl font-bold text-gray-700 mb-2 md:mb-3">Cari Penyakit/Hama:</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama penyakit atau hama..."
                className="w-full px-4 md:px-6 py-3 md:py-4 border-4 border-gray-400 text-base md:text-xl focus:border-green-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg md:text-2xl font-bold text-gray-700 mb-2 md:mb-3">Tampilkan:</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <button
                  onClick={() => setFilter('semua')}
                  className={`px-4 md:px-6 py-3 md:py-4 border-4 font-bold text-base md:text-xl ${
                    filter === 'semua' 
                      ? 'bg-green-800 text-white border-green-900' 
                      : 'bg-white text-gray-700 border-gray-400 hover:bg-gray-100'
                  }`}
                >
                  SEMUA<br className="hidden md:block"/>({tebuDiseases.length})
                </button>
                <button
                  onClick={() => setFilter('penyakit')}
                  className={`px-4 md:px-6 py-3 md:py-4 border-4 font-bold text-base md:text-xl ${
                    filter === 'penyakit' 
                      ? 'bg-purple-700 text-white border-purple-900' 
                      : 'bg-white text-gray-700 border-gray-400 hover:bg-gray-100'
                  }`}
                >
                  PENYAKIT<br className="hidden md:block"/>({tebuDiseases.filter(d => d.type === 'penyakit').length})
                </button>
                <button
                  onClick={() => setFilter('hama')}
                  className={`px-4 md:px-6 py-3 md:py-4 border-4 font-bold text-base md:text-xl ${
                    filter === 'hama' 
                      ? 'bg-orange-700 text-white border-orange-900' 
                      : 'bg-white text-gray-700 border-gray-400 hover:bg-gray-100'
                  }`}
                >
                  HAMA<br className="hidden md:block"/>({tebuDiseases.filter(d => d.type === 'hama').length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="bg-amber-100 border-4 border-amber-600 p-3 md:p-4 mb-4 md:mb-6 text-center">
          <p className="text-lg md:text-2xl font-bold text-gray-800">
            Menampilkan {filteredDiseases.length} dari {tebuDiseases.length} Data
          </p>
        </div>

        {/* Disease List */}
        <div className="space-y-4 md:space-y-6">
          {filteredDiseases.map((disease) => (
            <div key={disease.id} className="bg-white border-4 border-gray-600">
              {disease.imageUrl && (
                <div className="border-b-4 border-gray-600">
                  <img 
                    src={disease.imageUrl} 
                    alt={disease.name}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </div>
              )}
              <div className="p-4 md:p-8">
                <div className="text-center mb-4 md:mb-6 pb-4 md:pb-6 border-b-4 border-gray-300">
                  <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-2 md:mb-3">
                    <span className={`px-3 md:px-4 py-1 md:py-2 border-4 text-sm md:text-lg font-bold ${
                      disease.type === 'hama' 
                        ? 'border-orange-600 bg-orange-100 text-orange-900' 
                        : 'border-purple-600 bg-purple-100 text-purple-900'
                    }`}>
                      {disease.type === 'hama' ? 'HAMA' : 'PENYAKIT'}
                    </span>
                    <span className={`px-3 md:px-4 py-1 md:py-2 border-4 text-sm md:text-lg font-bold ${
                      disease.severity === 'berat' ? 'border-red-600 bg-red-100 text-red-900' :
                      disease.severity === 'sedang' ? 'border-yellow-600 bg-yellow-100 text-yellow-900' :
                      'border-blue-600 bg-blue-100 text-blue-900'
                    }`}>
                      TINGKAT: {disease.severity.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-green-900 mb-1 md:mb-2">
                    {disease.name}
                  </h3>
                  {disease.latinName && (
                    <p className="text-base md:text-xl text-gray-600 italic">({disease.latinName})</p>
                  )}
                  <p className="text-xs md:text-sm text-gray-500 font-mono mt-1 md:mt-2">Kode: {disease.code}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Deskripsi:
                      </h4>
                      <p className="text-gray-700 text-sm">{disease.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Penyebab:
                      </h4>
                      <p className="text-gray-700 text-sm">{disease.causes}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Gejala yang Terlihat:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {disease.symptoms.map(symptomId => (
                          <span key={symptomId} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {getSymptomName(symptomId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Cara Penanganan:
                      </h4>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                        {disease.solutions.map((solution, i) => (
                          <li key={i}>{solution}</li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Pencegahan:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        {disease.prevention.map((prev, i) => (
                          <li key={i}>{prev}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDiseases.length === 0 && (
          <div className="bg-yellow-100 border-4 border-yellow-600 p-6 md:p-8 text-center">
            <p className="text-xl md:text-2xl font-bold text-yellow-900">
              Tidak ada data yang sesuai
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 md:mt-8 text-center">
          <Link
            href="/tebu-konsultasi"
            className="inline-block bg-green-800 text-white px-8 md:px-16 py-4 md:py-6 text-lg md:text-2xl font-bold border-4 border-green-900 hover:bg-green-700 w-full md:w-auto"
          >
            MULAI KONSULTASI DIAGNOSIS
          </Link>
        </div>
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
