import Link from 'next/link';
import Image from 'next/image';

export default function PisangPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <div className="bg-yellow-800 border-b-8 border-yellow-900 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-yellow-50 uppercase tracking-wide">
            SISTEM PAKAR DIAGNOSIS
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-50 uppercase mt-2">
            PENYAKIT DAN HAMA TANAMAN PISANG
          </h2>
          <p className="text-center text-yellow-100 text-xl mt-4 max-w-3xl mx-auto">
            Sistem bantu untuk mengenali dan menangani masalah pada tanaman pisang Anda
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Hero Image */}
        <div className="mb-12">
          <div className="relative h-64 md:h-96 bg-yellow-200 border-8 border-yellow-800">
            <Image
              src="https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=1200"
              alt="Tanaman Pisang"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Cara Kerja Sistem */}
        <div className="bg-white border-8 border-yellow-800 p-8 mb-8">
          <h3 className="text-3xl font-bold text-yellow-900 uppercase text-center mb-6 border-b-4 border-yellow-800 pb-4">
            CARA KERJA SISTEM
          </h3>
          
          <div className="space-y-6 text-lg">
            <div className="border-4 border-yellow-700 p-6 bg-yellow-50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-800 text-yellow-50 flex items-center justify-center text-2xl font-bold flex-shrink-0 border-4 border-yellow-900">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-yellow-900 text-xl mb-2">PILIH GEJALA</h4>
                  <p className="text-gray-700">
                    Pengguna memilih gejala yang terlihat pada tanaman pisang, seperti: akar berwarna coklat, 
                    keluar cairan dari batang, daun berbercak, buah tidak berkembang.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-4 border-yellow-700 p-6 bg-yellow-50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-800 text-yellow-50 flex items-center justify-center text-2xl font-bold flex-shrink-0 border-4 border-yellow-900">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-yellow-900 text-xl mb-2">SISTEM MENGANALISIS</h4>
                  <p className="text-gray-700">
                    Sistem mengumpulkan semua gejala yang dipilih, kemudian mencocokkan dengan 
                    daftar aturan penyakit yang sudah tersimpan dalam database.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-4 border-yellow-700 p-6 bg-yellow-50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-800 text-yellow-50 flex items-center justify-center text-2xl font-bold flex-shrink-0 border-4 border-yellow-900">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-yellow-900 text-xl mb-2">HASIL DIAGNOSIS</h4>
                  <p className="text-gray-700">
                    Jika gejala cocok dengan ciri suatu penyakit, sistem menampilkan diagnosis seperti: 
                    Penyakit Layu Moko, Penyakit Panama, Penyakit Sigatoka, atau jenis hama tertentu.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-4 border-yellow-700 p-6 bg-yellow-50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-800 text-yellow-50 flex items-center justify-center text-2xl font-bold flex-shrink-0 border-4 border-yellow-900">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-yellow-900 text-xl mb-2">SARAN TINDAKAN</h4>
                  <p className="text-gray-700">
                    Sistem memberikan saran lengkap berupa: cara pencegahan, pengendalian fisik 
                    (tanpa obat), dan pengendalian kimia (menggunakan pestisida).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metode Forward Chaining */}
        <div className="bg-yellow-100 border-8 border-yellow-800 p-8 mb-8">
          <h3 className="text-3xl font-bold text-yellow-900 uppercase text-center mb-4">
            METODE: FORWARD CHAINING
          </h3>
          <div className="text-center text-lg text-gray-700 max-w-3xl mx-auto">
            <p className="mb-4 font-bold text-xl text-yellow-900">
              Sistem bekerja dari gejala ke diagnosis
            </p>
            <p className="leading-relaxed">
              Forward Chaining artinya sistem mulai dari <strong>gejala yang terlihat</strong>, 
              kemudian mencari tahu <strong>penyakit apa</strong> yang memiliki gejala tersebut. 
              Seperti dokter yang memeriksa gejala pasien dulu, baru menentukan penyakitnya.
            </p>
          </div>
        </div>

        {/* Menu Utama */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
          {/* Konsultasi Terarah */}
          <Link href="/pisang-konsultasi-wizard" className="block h-full">
            <div className="h-full bg-yellow-600 border-4 md:border-8 border-yellow-900 p-6 md:p-8 hover:bg-yellow-700 transition-colors cursor-pointer flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-50 uppercase text-center mb-3 md:mb-4">
                KONSULTASI TERARAH
              </h3>
              <p className="text-yellow-50 text-center text-base md:text-lg leading-relaxed flex-grow">
                Diagnosis step-by-step dengan pertanyaan terarah per bagian tanaman. 
                <strong className="block mt-2">Lebih mudah & akurat!</strong>
              </p>
              <div className="mt-4 md:mt-6 text-center">
                <span className="inline-block bg-yellow-50 text-yellow-900 px-6 md:px-8 py-2 md:py-3 font-bold text-lg md:text-xl border-4 border-yellow-900">
                  MULAI →
                </span>
              </div>
            </div>
          </Link>

          {/* Konsultasi Cepat */}
          <Link href="/pisang-konsultasi" className="block h-full">
            <div className="h-full bg-yellow-700 border-4 md:border-8 border-yellow-900 p-6 md:p-8 hover:bg-yellow-800 transition-colors cursor-pointer flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-50 uppercase text-center mb-3 md:mb-4">
                KONSULTASI CEPAT
              </h3>
              <p className="text-yellow-100 text-center text-base md:text-lg leading-relaxed flex-grow">
                Pilih semua gejala sekaligus dalam satu halaman untuk diagnosis yang lebih cepat
              </p>
              <div className="mt-4 md:mt-6 text-center">
                <span className="inline-block bg-yellow-50 text-yellow-900 px-6 md:px-8 py-2 md:py-3 font-bold text-lg md:text-xl border-4 border-yellow-900">
                  MULAI →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Daftar Penyakit - Full Width */}
        <div className="mt-6 md:mt-8">
          <Link href="/pisang-daftar" className="block">
            <div className="bg-yellow-700 border-4 md:border-8 border-yellow-900 p-6 md:p-8 hover:bg-yellow-800 transition-colors cursor-pointer">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-50 uppercase text-center mb-3">
                DAFTAR PENYAKIT & HAMA
              </h3>
              <p className="text-yellow-100 text-center text-base md:text-lg leading-relaxed">
                Lihat daftar lengkap penyakit dan hama pada pisang beserta cara penanganannya
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block bg-yellow-50 text-yellow-900 px-6 md:px-8 py-2 md:py-3 font-bold text-lg md:text-xl border-4 border-yellow-900">
                  LIHAT DAFTAR →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Tambahan */}
        <div className="mt-12 bg-white border-8 border-yellow-800 p-8">
          <h3 className="text-2xl font-bold text-yellow-900 uppercase text-center mb-6">
            INFORMASI PENTING
          </h3>
          <div className="space-y-4 text-lg text-gray-700">
            <p className="border-l-8 border-yellow-700 pl-6 py-2">
              <strong>Sistem ini adalah alat bantu.</strong> Untuk diagnosis yang lebih akurat, 
              konsultasikan dengan petugas penyuluh pertanian (PPL) atau ahli tanaman di daerah Anda.
            </p>
            <p className="border-l-8 border-yellow-700 pl-6 py-2">
              <strong>Gunakan pestisida dengan bijak.</strong> Ikuti petunjuk penggunaan pada kemasan 
              dan gunakan alat pelindung diri yang sesuai.
            </p>
            <p className="border-l-8 border-yellow-700 pl-6 py-2">
              <strong>Pencegahan lebih baik.</strong> Jaga kebersihan kebun, gunakan bibit sehat, 
              dan lakukan monitoring rutin untuk mencegah penyakit dan hama.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center space-y-4">
          <Link href="/" className="inline-block bg-yellow-800 text-yellow-50 px-8 py-4 text-xl font-bold border-4 border-yellow-900 hover:bg-yellow-900 transition-colors uppercase">
            KEMBALI KE BERANDA
          </Link>

          {/* Admin Link */}
          <div>
            <Link href="/pisang-admin" className="inline-block text-sm text-gray-500 hover:text-yellow-700 underline">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
