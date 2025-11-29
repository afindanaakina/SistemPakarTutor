import Card from '../components/Card';
import Link from 'next/link';

export default function PengenalanPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Sistem Pakar</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Apa itu Sistem Pakar?
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Memahami konsep dasar sistem pakar dan bagaimana komputer dapat meniru keahlian manusia
      </p>

      <div className="space-y-6">
        {/* Definisi */}
        <Card title="Definisi Sistem Pakar">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 mb-4 text-lg">
              <strong>Sistem Pakar (Expert System)</strong> adalah program komputer yang dirancang untuk meniru 
              kemampuan pengambilan keputusan seorang pakar manusia dalam domain tertentu.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-blue-900 font-medium">
                <strong>Ilustrasi:</strong> Bayangkan Anda bisa berkonsultasi dengan seorang dokter, mekanik, atau ahli kapan saja 
                melalui komputer - itulah sistem pakar!
              </p>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2 mt-6">Contoh Penggunaan:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Kesehatan:</strong> Mendiagnosis penyakit berdasarkan gejala pasien</li>
              <li><strong>Keuangan:</strong> Memberikan rekomendasi investasi</li>
              <li><strong>Pertanian:</strong> Mengidentifikasi hama dan penyakit tanaman</li>
              <li><strong>Teknologi:</strong> Troubleshooting masalah komputer atau perangkat</li>
              <li><strong>Hukum:</strong> Analisis kasus dan rekomendasi legal</li>
            </ul>
          </div>
        </Card>

        {/* Mengapa Penting */}
        <Card title="Mengapa Sistem Pakar Penting?">
          <div className="prose prose-sm max-w-none">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3">
                  Keuntungan
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Keahlian tersedia 24/7</li>
                  <li>Konsisten dalam pengambilan keputusan</li>
                  <li>Mengurangi biaya konsultasi pakar</li>
                  <li>Menyimpan pengetahuan pakar secara permanen</li>
                  <li>Dapat menangani banyak kasus sekaligus</li>
                  <li>Membantu pelatihan tenaga baru</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-3">
                  Keterbatasan
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Terbatas pada domain spesifik</li>
                  <li>Tidak bisa menangani masalah baru yang belum diprogramkan</li>
                  <li>Tidak memiliki kreativitas manusia</li>
                  <li>Membutuhkan pemeliharaan dan update berkala</li>
                  <li>Kualitas tergantung pada knowledge base</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Komponen Sistem Pakar */}
        <Card title="Komponen Utama Sistem Pakar">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 mb-6">
              Sistem pakar terdiri dari beberapa komponen penting yang bekerja sama:
            </p>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg p-4">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Knowledge Base (Basis Pengetahuan)
                </h4>
                <p className="text-gray-700 ml-10">
                  Tempat penyimpanan semua pengetahuan domain yang berisi fakta dan aturan. 
                  Seperti "perpustakaan" sistem pakar.
                </p>
                <div className="ml-10 mt-2 bg-white rounded p-3 text-sm">
                  <strong>Contoh:</strong> "Jika demam DAN batuk DAN sakit tenggorokan MAKA kemungkinan flu"
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 rounded-lg p-4">
                <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Inference Engine (Mesin Inferensi)
                </h4>
                <p className="text-gray-700 ml-10">
                  "Otak" sistem yang melakukan penalaran dengan memanipulasi pengetahuan untuk 
                  mencapai kesimpulan. Ada 2 metode utama: Forward Chaining dan Backward Chaining.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-4">
                <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  Working Memory (Memori Kerja)
                </h4>
                <p className="text-gray-700 ml-10">
                  Tempat penyimpanan sementara untuk fakta-fakta yang sedang diproses dan 
                  kesimpulan yang telah diperoleh.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-lg p-4">
                <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  User Interface (Antarmuka Pengguna)
                </h4>
                <p className="text-gray-700 ml-10">
                  Jembatan komunikasi antara pengguna dengan sistem pakar, memungkinkan 
                  input pertanyaan dan menampilkan hasil.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Metode Inferensi */}
        <Card title="Metode Inferensi dalam Sistem Pakar">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 mb-6">
              Ada dua metode utama yang digunakan mesin inferensi untuk melakukan penalaran:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Forward Chaining */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    →
                  </div>
                  <h4 className="font-bold text-blue-900 text-lg">Forward Chaining</h4>
                </div>
                <p className="text-gray-700 mb-3">
                  Penalaran <strong>maju</strong> dari fakta menuju kesimpulan.
                </p>
                <div className="bg-white rounded-lg p-3 mb-3 text-sm">
                  <strong>Mulai dari:</strong> Data/Fakta yang ada<br/>
                  <strong>Mencari:</strong> Kesimpulan yang bisa didapat
                </div>
                <div className="text-sm text-gray-700 mb-3">
                  <strong>Contoh:</strong> Dokter melihat gejala (demam, batuk) → diagnosis penyakit
                </div>
                <div className="bg-blue-200 rounded-lg p-3 text-sm">
                  <strong>Cocok untuk:</strong> Monitoring, kontrol, prediksi
                </div>
              </div>

              {/* Backward Chaining */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    ←
                  </div>
                  <h4 className="font-bold text-purple-900 text-lg">Backward Chaining</h4>
                </div>
                <p className="text-gray-700 mb-3">
                  Penalaran <strong>mundur</strong> dari tujuan menuju fakta.
                </p>
                <div className="bg-white rounded-lg p-3 mb-3 text-sm">
                  <strong>Mulai dari:</strong> Tujuan/Hipotesis<br/>
                  <strong>Mencari:</strong> Fakta yang mendukung
                </div>
                <div className="text-sm text-gray-700 mb-3">
                  <strong>Contoh:</strong> Diagnosis (flu?) → cari gejala pendukung
                </div>
                <div className="bg-purple-200 rounded-lg p-3 text-sm">
                  <strong>Cocok untuk:</strong> Diagnosis, troubleshooting, verifikasi
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white rounded-xl p-6">
              <h4 className="font-bold text-lg mb-2">
                Pembelajaran Lengkap: Forward & Backward Chaining
              </h4>
              <p className="text-blue-50">
                Platform ini menyediakan pembelajaran <strong>lengkap untuk kedua metode</strong>. 
                Anda akan mempelajari Forward Chaining (penalaran maju) dan Backward Chaining (penalaran mundur) 
                dengan teori, demo, dan simulator interaktif untuk masing-masing metode.
              </p>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2 border-blue-200 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Siap Belajar Sistem Pakar?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Sekarang Anda sudah memahami konsep dasar sistem pakar. 
            Mari kita pelajari lebih dalam tentang kedua metode inferensi dan praktik langsung!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/materi"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              Forward Chaining
              <span>→</span>
            </Link>
            <Link
              href="/backward"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              Backward Chaining
              <span>←</span>
            </Link>
            <Link
              href="/playground"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              Playground
              <span>⚡</span>
            </Link>
          </div>
        </div>

        {/* Learning Path */}
        <Card title="Alur Pembelajaran">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div className="flex-1">
                <h4 className="font-bold text-green-900">Teori Dasar (Anda di sini)</h4>
                <p className="text-sm text-green-700">Memahami konsep dasar dan komponen sistem pakar</p>
              </div>
              <span className="text-2xl">✅</span>
            </div>

            <div className="flex items-center gap-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-900">Forward Chaining</h4>
                <p className="text-sm text-blue-700">Penalaran maju: dari fakta menuju kesimpulan</p>
              </div>
              <Link href="/materi" className="text-blue-600 hover:text-blue-700 font-bold text-sm">Pelajari →</Link>
            </div>

            <div className="flex items-center gap-4 p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div className="flex-1">
                <h4 className="font-bold text-purple-900">Backward Chaining</h4>
                <p className="text-sm text-purple-700">Penalaran mundur: dari tujuan menuju fakta</p>
              </div>
              <Link href="/backward" className="text-purple-600 hover:text-purple-700 font-bold text-sm">Pelajari →</Link>
            </div>

            <div className="flex items-center gap-4 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded">
              <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div className="flex-1">
                <h4 className="font-bold text-indigo-900">Playground</h4>
                <p className="text-sm text-indigo-700">Bandingkan kedua metode secara langsung</p>
              </div>
              <Link href="/playground" className="text-indigo-600 hover:text-indigo-700 font-bold text-sm">Coba →</Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
