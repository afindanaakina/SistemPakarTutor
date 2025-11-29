'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { pisangDiseases } from '../data/pisang-diseases';

export default function PisangDaftarPage() {
  const [filter, setFilter] = useState<'semua' | 'penyakit' | 'hama'>('semua');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDiseases = pisangDiseases.filter(disease => {
    const matchesFilter = filter === 'semua' || disease.type === filter;
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const penyakitCount = pisangDiseases.filter(d => d.type === 'penyakit').length;
  const hamaCount = pisangDiseases.filter(d => d.type === 'hama').length;

  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <div className="bg-yellow-800 border-b-8 border-yellow-900 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-50 uppercase">
            DAFTAR PENYAKIT & HAMA PISANG
          </h1>
          <p className="text-center text-yellow-100 text-lg mt-2">
            Informasi lengkap tentang penyakit dan hama pada tanaman pisang
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white border-4 md:border-8 border-yellow-900 p-4 md:p-6 text-center">
            <div className="text-4xl md:text-5xl font-bold text-yellow-800 mb-2">
              {pisangDiseases.length}
            </div>
            <div className="text-base md:text-xl font-bold text-gray-700 uppercase">
              Total Data
            </div>
          </div>
          <div className="bg-white border-4 md:border-8 border-yellow-900 p-4 md:p-6 text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-700 mb-2">
              {penyakitCount}
            </div>
            <div className="text-base md:text-xl font-bold text-gray-700 uppercase">
              Penyakit
            </div>
          </div>
          <div className="bg-white border-4 md:border-8 border-yellow-900 p-4 md:p-6 text-center">
            <div className="text-4xl md:text-5xl font-bold text-orange-700 mb-2">
              {hamaCount}
            </div>
            <div className="text-base md:text-xl font-bold text-gray-700 uppercase">
              Hama
            </div>
          </div>
        </div>

        {/* Filter dan Search */}
        <div className="bg-white border-4 md:border-8 border-yellow-900 p-4 md:p-6 mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Filter */}
            <div>
              <label className="block text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3">
                FILTER JENIS
              </label>
              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={() => setFilter('semua')}
                  className={`flex-1 py-3 md:py-4 px-3 md:px-6 text-sm md:text-lg font-bold border-4 uppercase ${
                    filter === 'semua'
                      ? 'bg-yellow-700 text-yellow-50 border-yellow-900'
                      : 'bg-yellow-50 text-gray-700 border-yellow-700 hover:bg-yellow-100'
                  }`}
                >
                  SEMUA
                </button>
                <button
                  onClick={() => setFilter('penyakit')}
                  className={`flex-1 py-3 md:py-4 px-3 md:px-6 text-sm md:text-lg font-bold border-4 uppercase ${
                    filter === 'penyakit'
                      ? 'bg-yellow-700 text-yellow-50 border-yellow-900'
                      : 'bg-yellow-50 text-gray-700 border-yellow-700 hover:bg-yellow-100'
                  }`}
                >
                  PENYAKIT
                </button>
                <button
                  onClick={() => setFilter('hama')}
                  className={`flex-1 py-3 md:py-4 px-3 md:px-6 text-sm md:text-lg font-bold border-4 uppercase ${
                    filter === 'hama'
                      ? 'bg-yellow-700 text-yellow-50 border-yellow-900'
                      : 'bg-yellow-50 text-gray-700 border-yellow-700 hover:bg-yellow-100'
                  }`}
                >
                  HAMA
                </button>
              </div>
            </div>

            {/* Search */}
            <div>
              <label className="block text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3">
                CARI
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ketik nama penyakit atau hama..."
                className="w-full py-3 md:py-4 px-4 md:px-6 text-base md:text-lg border-4 border-yellow-700 focus:border-yellow-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hasil Filter */}
        <div className="bg-yellow-100 border-4 border-yellow-700 p-3 md:p-4 mb-4 md:mb-6 text-center">
          <span className="text-lg md:text-xl font-bold text-yellow-900">
            MENAMPILKAN {filteredDiseases.length} DATA
          </span>
        </div>

        {/* Daftar Penyakit dan Hama */}
        <div className="space-y-6 md:space-y-8">
          {filteredDiseases.map((disease) => (
            <div key={disease.id} className="bg-white border-4 md:border-8 border-yellow-900">
              {/* Header */}
              <div className="bg-yellow-700 p-4 md:p-6 border-b-4 md:border-b-8 border-yellow-900">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <span className="bg-yellow-50 text-yellow-900 px-3 md:px-4 py-1 md:py-2 text-base md:text-lg font-bold border-4 border-yellow-900">
                        {disease.id}
                      </span>
                      <span className={`px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-bold uppercase border-4 border-yellow-900 ${
                        disease.type === 'penyakit'
                          ? 'bg-red-700 text-red-50'
                          : 'bg-orange-700 text-orange-50'
                      }`}>
                        {disease.type}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-50 uppercase">
                      {disease.name}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                {/* Image */}
                {disease.image && (
                  <div className="mb-4 md:mb-6">
                    <a
                      href={disease.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative h-40 md:h-48 bg-yellow-200 border-4 border-yellow-700 hover:border-yellow-900 transition-colors group"
                      title="Klik untuk lihat gambar lebih besar"
                    >
                      <Image
                        src={disease.image}
                        alt={disease.name}
                        fill
                        className="object-cover group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                        <span className="bg-yellow-700 text-yellow-50 px-4 py-2 font-bold border-2 border-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity">
                          🔍 LIHAT GAMBAR
                        </span>
                      </div>
                    </a>
                  </div>
                )}

                <div className="space-y-4 md:space-y-6">
                  {/* Penyebab */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                      PENYEBAB
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">{disease.cause}</p>
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                      KETERANGAN
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">{disease.description}</p>
                  </div>

                  {/* Gejala */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                      GEJALA-GEJALA
                    </h3>
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
                    <h3 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                      CARA PENCEGAHAN
                    </h3>
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
                    <h3 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                      PENGENDALIAN FISIK (TANPA OBAT)
                    </h3>
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
                    <h3 className="text-lg md:text-xl font-bold text-yellow-900 uppercase mb-2 md:mb-3 border-b-4 border-yellow-700 pb-2">
                      PENGENDALIAN KIMIA (DENGAN PESTISIDA)
                    </h3>
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
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDiseases.length === 0 && (
          <div className="bg-white border-4 md:border-8 border-yellow-900 p-8 md:p-12 text-center">
            <p className="text-xl md:text-2xl font-bold text-gray-700 mb-3 md:mb-4">
              TIDAK ADA DATA YANG COCOK
            </p>
            <p className="text-base md:text-lg text-gray-600">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6 md:mt-8 text-center">
          <Link href="/pisang" className="inline-block bg-yellow-800 text-yellow-50 px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl font-bold border-4 border-yellow-900 hover:bg-yellow-900 uppercase">
            KEMBALI
          </Link>
        </div>
      </div>
    </div>
  );
}
