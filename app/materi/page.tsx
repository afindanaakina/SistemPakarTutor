import Card from '../components/Card';
import Link from 'next/link';

export default function MateriPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Beranda</Link>
        <span className="mx-2">/</span>
        <Link href="/pengenalan" className="hover:text-blue-600">Sistem Pakar</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Forward Chaining</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Metode Forward Chaining
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Memahami cara kerja metode inferensi yang bergerak maju dari fakta menuju kesimpulan
      </p>

      <div className="space-y-6">
        {/* Definisi */}
        <Card title="1. Definisi Forward Chaining">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 mb-4 text-lg">
              <strong>Forward Chaining</strong> adalah metode inferensi yang dimulai dari 
              fakta-fakta yang diketahui, kemudian menggunakan aturan-aturan untuk menarik 
              kesimpulan baru hingga mencapai tujuan atau tidak ada aturan yang dapat dijalankan lagi.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-blue-900 font-medium">
                <strong>Analogi:</strong> Seperti detektif yang mengumpulkan petunjuk (fakta), 
                kemudian menganalisis satu per satu hingga menemukan kesimpulan siapa pelakunya.
              </p>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2 mt-6">Karakteristik Utama:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Dimulai dari data atau fakta yang tersedia</li>
              <li>Bersifat <strong>data-driven</strong> (didorong oleh data)</li>
              <li>Bergerak dari premis menuju konklusi</li>
              <li>Cocok untuk masalah prediksi, monitoring, dan kontrol</li>
              <li>Menghasilkan semua kesimpulan yang mungkin</li>
            </ul>
          </div>
        </Card>

        {/* Cara Kerja */}
        <Card title="2. Cara Kerja Forward Chaining">
          <div className="prose prose-sm max-w-none">
            <h4 className="font-semibold text-gray-900 mb-4 text-lg">Algoritma Dasar:</h4>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h5 className="font-bold text-blue-900 mb-1">Inisialisasi</h5>
                    <p className="text-gray-700">
                      Masukkan semua fakta awal ke dalam <strong>Working Memory</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h5 className="font-bold text-purple-900 mb-1">Cari Aturan yang Dapat Dijalankan</h5>
                    <p className="text-gray-700">
                      Temukan aturan di Knowledge Base yang semua kondisinya terpenuhi oleh 
                      fakta-fakta di Working Memory
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
                    <h5 className="font-bold text-green-900 mb-1">Jalankan Aturan (Fire Rule)</h5>
                    <p className="text-gray-700">
                      Tambahkan kesimpulan dari aturan tersebut ke Working Memory sebagai fakta baru
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
                    <h5 className="font-bold text-orange-900 mb-1">Ulangi Proses</h5>
                    <p className="text-gray-700">
                      Kembali ke langkah 2 hingga tidak ada aturan yang dapat dijalankan 
                      atau tujuan (goal) telah tercapai
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-100 rounded-lg p-4">
              <h5 className="font-bold text-gray-900 mb-2">Pseudocode:</h5>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`WHILE ada aturan yang dapat dijalankan DO
  PILIH aturan yang semua kondisinya terpenuhi
  JALANKAN aturan tersebut
  TAMBAHKAN kesimpulan ke Working Memory
  TANDAI aturan sebagai sudah dijalankan
END WHILE`}
              </pre>
            </div>
          </div>
        </Card>

        {/* Representasi Pengetahuan */}
        <Card title="3. Representasi Pengetahuan">
          <div className="prose prose-sm max-w-none">
            <h4 className="font-semibold text-gray-900 mb-3">Format Aturan (Rule):</h4>
            <p className="text-gray-700 mb-4">
              Aturan dalam forward chaining dinyatakan dalam bentuk implikasi:
            </p>
            <div className="bg-gray-100 rounded-lg p-4 mb-4 font-mono text-sm">
              <p className="text-gray-800 font-semibold">
                IF [kondisi1] AND [kondisi2] ... AND [kondisiN] THEN [kesimpulan]
              </p>
            </div>

            <h4 className="font-semibold text-gray-900 mb-3 mt-6">Komponen Aturan:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-bold text-blue-900 mb-2">Anteseden (IF)</h5>
                <p className="text-gray-700 text-sm">
                  Kondisi atau premis yang harus dipenuhi. Dapat berupa satu atau 
                  lebih fakta yang dihubungkan dengan operator logika (AND, OR).
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-bold text-green-900 mb-2">Konsekuen (THEN)</h5>
                <p className="text-gray-700 text-sm">
                  Kesimpulan atau aksi yang diambil jika semua kondisi terpenuhi. 
                  Menjadi fakta baru dalam Working Memory.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contoh Kasus */}
        <Card title="4. Contoh Kasus: Identifikasi Hewan">
          <div className="prose prose-sm max-w-none">
            <div className="space-y-6">
              {/* Fakta Awal */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Fakta Awal (Initial Facts):</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-green-50 border-l-4 border-green-500 rounded p-3">
                    <p className="font-medium text-green-900">has_fur = true</p>
                    <p className="text-sm text-green-700">Hewan memiliki bulu</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 rounded p-3">
                    <p className="font-medium text-green-900">eats_meat = true</p>
                    <p className="text-sm text-green-700">Hewan memakan daging</p>
                  </div>
                </div>
              </div>

              {/* Aturan */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Knowledge Base (Rules):</h4>
                <div className="space-y-3">
                  <div className="bg-purple-50 border-l-4 border-purple-500 rounded p-3">
                    <p className="font-bold text-purple-900 mb-1">Rule 1:</p>
                    <p className="text-sm text-gray-700">
                      IF has_fur THEN is_mammal
                    </p>
                    <p className="text-xs text-purple-700 mt-1">
                      "Jika memiliki bulu maka termasuk mamalia"
                    </p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-500 rounded p-3">
                    <p className="font-bold text-purple-900 mb-1">Rule 2:</p>
                    <p className="text-sm text-gray-700">
                      IF is_mammal AND eats_meat THEN is_carnivore
                    </p>
                    <p className="text-xs text-purple-700 mt-1">
                      "Jika mamalia dan memakan daging maka karnivora"
                    </p>
                  </div>
                </div>
              </div>

              {/* Proses Inferensi */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Proses Inferensi Step-by-Step:</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-bold text-blue-900">Langkah 1:</p>
                    <p className="text-gray-700 text-sm">Working Memory: [has_fur, eats_meat]</p>
                    <p className="text-gray-700 text-sm">Rule yang dapat dijalankan: Rule 1</p>
                    <p className="text-gray-700 text-sm">Kesimpulan: is_mammal</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-bold text-green-900">Langkah 2:</p>
                    <p className="text-gray-700 text-sm">Working Memory: [has_fur, eats_meat, is_mammal]</p>
                    <p className="text-gray-700 text-sm">Rule yang dapat dijalankan: Rule 2</p>
                    <p className="text-gray-700 text-sm">Kesimpulan: is_carnivore</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-bold text-purple-900">Hasil Akhir:</p>
                    <p className="text-gray-700 text-sm">Working Memory: [has_fur, eats_meat, is_mammal, is_carnivore]</p>
                    <p className="text-gray-700 text-sm font-semibold">Kesimpulan: Hewan tersebut adalah mamalia karnivora</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Kelebihan dan Kekurangan */}
        <Card title="5. Kelebihan dan Kekurangan Forward Chaining">
          <div className="prose prose-sm max-w-none">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-3 text-lg">Kelebihan:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Mudah dipahami dan diimplementasikan</li>
                  <li>Efisien untuk masalah dengan banyak fakta awal</li>
                  <li>Cocok untuk sistem monitoring dan kontrol real-time</li>
                  <li>Menghasilkan semua kesimpulan yang mungkin dari data yang ada</li>
                  <li>Baik untuk prediksi dan perencanaan</li>
                  <li>Proses inferensi transparan dan mudah dijelaskan</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3 text-lg">Kekurangan:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li>Dapat menghasilkan fakta yang tidak relevan dengan tujuan</li>
                  <li>Kurang efisien jika tujuan (goal) sudah diketahui dari awal</li>
                  <li>Membutuhkan memori lebih banyak untuk Working Memory</li>
                  <li>Proses bisa lambat dengan jumlah aturan yang sangat besar</li>
                  <li>Tidak cocok untuk masalah diagnosis yang spesifik</li>
                  <li>Bisa terjadi redundansi dalam proses inferensi</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Aplikasi */}
        <Card title="6. Aplikasi Forward Chaining">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 mb-4">
              Forward chaining banyak digunakan dalam berbagai bidang:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-bold text-blue-900 mb-2">Sistem Monitoring</h5>
                <p className="text-gray-700 text-sm">
                  Memantau kondisi sistem atau proses secara real-time dan memberikan 
                  peringatan atau rekomendasi berdasarkan data sensor.
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h5 className="font-bold text-purple-900 mb-2">Sistem Kontrol</h5>
                <p className="text-gray-700 text-sm">
                  Mengontrol peralatan atau proses industri berdasarkan kondisi 
                  dan aturan yang telah ditentukan.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-bold text-green-900 mb-2">Sistem Prediksi</h5>
                <p className="text-gray-700 text-sm">
                  Memprediksi hasil atau kondisi masa depan berdasarkan data 
                  historis dan aturan domain.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h5 className="font-bold text-orange-900 mb-2">Business Rules Engine</h5>
                <p className="text-gray-700 text-sm">
                  Menerapkan aturan bisnis secara otomatis dalam sistem enterprise 
                  untuk pengambilan keputusan.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Siap Praktik Langsung?
          </h3>
          <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
            Sekarang Anda sudah memahami teori forward chaining. 
            Saatnya mempraktikkan dengan simulator interaktif atau melihat demo kasus nyata!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/simulator"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
            >
              Buka Simulator
              <span>→</span>
            </Link>
            <Link
              href="/demo"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
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
