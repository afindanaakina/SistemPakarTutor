import Card from '../components/Card';
import Link from 'next/link';

export default function BackwardPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Backward Chaining</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Metode Backward Chaining
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Memahami cara kerja metode inferensi yang bergerak mundur dari tujuan ke fakta
      </p>

      <div className="space-y-6">
        {/* Definisi */}
        <Card title="1. Definisi Backward Chaining">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 mb-4 text-lg">
              <strong>Backward Chaining</strong> adalah metode inferensi yang dimulai dari 
              tujuan (goal) yang ingin dicapai, kemudian bekerja mundur untuk mencari 
              fakta-fakta yang mendukung tujuan tersebut.
            </p>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 mb-4">
              <p className="text-purple-900 font-medium">
                <strong>Analogi:</strong> Seperti detektif yang sudah punya tersangka (hipotesis), 
                lalu mencari bukti-bukti yang mendukung atau membantah dugaan tersebut.
              </p>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2 mt-6">Karakteristik Utama:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Dimulai dari goal atau hipotesis yang ingin dibuktikan</li>
              <li>Bersifat <strong>goal-driven</strong> (didorong oleh tujuan)</li>
              <li>Bergerak dari konklusi menuju premis</li>
              <li>Cocok untuk masalah diagnosis, verifikasi, dan troubleshooting</li>
              <li>Lebih efisien jika goal sudah diketahui</li>
              <li>Hanya mencari fakta yang relevan dengan goal</li>
            </ul>
          </div>
        </Card>

        {/* Cara Kerja */}
        <Card title="2. Cara Kerja Backward Chaining">
          <div className="prose prose-sm max-w-none">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Algoritma Dasar:</h4>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-purple-900 mb-1">Tentukan Goal</h5>
                    <p className="text-gray-700">
                      Mulai dengan goal atau hipotesis yang ingin dibuktikan
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-900 mb-1">Cek Fakta</h5>
                    <p className="text-gray-700">
                      Jika goal sudah ada di working memory, maka goal terbukti
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h5 className="font-bold text-green-900 mb-1">Cari Aturan</h5>
                    <p className="text-gray-700">
                      Temukan aturan yang kesimpulannya adalah goal tersebut
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h5 className="font-bold text-orange-900 mb-1">Rekursi Sub-Goal</h5>
                    <p className="text-gray-700">
                      Untuk setiap kondisi dalam aturan, jadikan sebagai sub-goal baru dan ulangi proses
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <h5 className="font-bold text-gray-900 mb-2">Pseudocode:</h5>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`FUNCTION prove(goal):
  IF goal IN working_memory THEN
    RETURN TRUE
  END IF
  
  FOR EACH rule WHERE rule.conclusion = goal:
    IF prove_all(rule.conditions) THEN
      ADD goal TO working_memory
      RETURN TRUE
    END IF
  END FOR
  
  RETURN FALSE`}
              </pre>
            </div>
          </div>
        </Card>

        {/* Perbandingan dengan Forward Chaining */}
        <Card title="3. Perbandingan dengan Forward Chaining">
          <div className="prose prose-sm max-w-none">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left">Aspek</th>
                    <th className="border border-gray-300 p-3 text-left">Forward Chaining</th>
                    <th className="border border-gray-300 p-3 text-left">Backward Chaining</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Arah Inferensi</td>
                    <td className="border border-gray-300 p-3">Fakta → Kesimpulan</td>
                    <td className="border border-gray-300 p-3">Goal → Fakta</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Pendekatan</td>
                    <td className="border border-gray-300 p-3">Data-driven</td>
                    <td className="border border-gray-300 p-3">Goal-driven</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Kapan Efisien</td>
                    <td className="border border-gray-300 p-3">Banyak fakta, sedikit goal</td>
                    <td className="border border-gray-300 p-3">Sedikit fakta, goal spesifik</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3 font-semibold">Aplikasi Utama</td>
                    <td className="border border-gray-300 p-3">Monitoring, kontrol, prediksi</td>
                    <td className="border border-gray-300 p-3">Diagnosis, verifikasi, troubleshooting</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3 font-semibold">Hasil</td>
                    <td className="border border-gray-300 p-3">Semua kesimpulan yang mungkin</td>
                    <td className="border border-gray-300 p-3">Hanya fakta relevan dengan goal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Contoh Kasus */}
        <Card title="4. Contoh Kasus: Diagnosis Medis">
          <div className="prose prose-sm max-w-none">
            <div className="space-y-6">
              {/* Goal */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Goal yang Ingin Dibuktikan:</h4>
                <div className="bg-purple-50 border-l-4 border-purple-500 rounded p-3">
                  <p className="font-medium text-purple-900">has_flu</p>
                  <p className="text-sm text-purple-700">Apakah pasien menderita flu?</p>
                </div>
              </div>

              {/* Aturan */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Knowledge Base (Rules):</h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-3">
                    <p className="font-bold text-blue-900 mb-1">Rule 1:</p>
                    <p className="text-sm text-gray-700">
                      IF fever AND headache THEN flu_symptoms
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      "Jika demam dan sakit kepala maka gejala flu"
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-3">
                    <p className="font-bold text-blue-900 mb-1">Rule 2:</p>
                    <p className="text-sm text-gray-700">
                      IF flu_symptoms AND cough THEN has_flu
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      "Jika gejala flu dan batuk maka terdiagnosis flu"
                    </p>
                  </div>
                </div>
              </div>

              {/* Proses Backward Chaining */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Proses Backward Chaining:</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-bold text-purple-900">Langkah 1: Query Goal</p>
                    <p className="text-gray-700 text-sm">Goal: has_flu</p>
                    <p className="text-gray-700 text-sm">Cari aturan yang menghasilkan has_flu → Rule 2</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 ml-4">
                    <p className="font-bold text-blue-900">Langkah 2: Sub-goal 1</p>
                    <p className="text-gray-700 text-sm">Perlu membuktikan: flu_symptoms</p>
                    <p className="text-gray-700 text-sm">Cari aturan yang menghasilkan flu_symptoms → Rule 1</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 ml-8">
                    <p className="font-bold text-green-900">Langkah 3: Sub-goal 1.1</p>
                    <p className="text-gray-700 text-sm">Perlu membuktikan: fever</p>
                    <p className="text-gray-700 text-sm">Cek fakta: fever ✓ (ada di working memory)</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4 ml-8">
                    <p className="font-bold text-green-900">Langkah 4: Sub-goal 1.2</p>
                    <p className="text-gray-700 text-sm">Perlu membuktikan: headache</p>
                    <p className="text-gray-700 text-sm">Cek fakta: headache ✓ (ada di working memory)</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4 ml-4">
                    <p className="font-bold text-blue-900">Langkah 5: Sub-goal 2</p>
                    <p className="text-gray-700 text-sm">Perlu membuktikan: cough</p>
                    <p className="text-gray-700 text-sm">Cek fakta: cough ✓ (ada di working memory)</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-bold text-purple-900">Hasil:</p>
                    <p className="text-gray-700 text-sm font-semibold">Goal has_flu TERBUKTI!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Kelebihan dan Kekurangan */}
        <Card title="5. Kelebihan dan Kekurangan Backward Chaining">
          <div className="prose prose-sm max-w-none">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3 text-lg">Kelebihan:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Efisien untuk membuktikan goal spesifik</li>
                  <li>Hanya memproses fakta yang relevan</li>
                  <li>Cocok untuk sistem diagnosis dan troubleshooting</li>
                  <li>Menghemat memori dan waktu komputasi</li>
                  <li>Mudah menjelaskan alasan (reasoning) ke user</li>
                  <li>Dapat berhenti segera setelah goal terbukti/tidak</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3 text-lg">Kekurangan:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Tidak efisien jika banyak goal yang harus dibuktikan</li>
                  <li>Dapat terjebak dalam loop tak terbatas</li>
                  <li>Kurang cocok untuk sistem monitoring real-time</li>
                  <li>Tidak menemukan semua kesimpulan yang mungkin</li>
                  <li>Memerlukan goal yang jelas di awal</li>
                  <li>Kompleksitas meningkat dengan depth recursion</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Siap Praktik Backward Chaining?
          </h3>
          <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
            Sekarang Anda sudah memahami teori backward chaining. 
            Saatnya mempraktikkan dengan simulator interaktif!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/backward/simulator"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              Buka Simulator
              <span>→</span>
            </Link>
            <Link
              href="/backward/demo"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              Lihat Demo
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
