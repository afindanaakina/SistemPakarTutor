import Link from 'next/link';

export default function TebuHomePage() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-green-900 text-white py-6 md:py-12 border-b-4 md:border-b-8 border-amber-700">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 tracking-wide">SISTEM PAKAR TEBU</h1>
            <p className="text-lg md:text-2xl text-amber-100 font-medium">Diagnosis Hama dan Penyakit Tanaman Tebu</p>
            <p className="text-base md:text-xl text-green-200 mt-2">Pabrik Gula Djatiroto</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Gambar Header Tebu */}
          <div className="mb-6 md:mb-8 border-4 md:border-8 border-green-900 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=400&fit=crop" 
              alt="Perkebunan Tebu"
              className="w-full h-40 md:h-64 object-cover"
            />
          </div>

          <div className="bg-white border-4 border-green-900 p-6 md:p-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-green-900 mb-4 md:mb-6">
              Sistem Bantuan Diagnosis Penyakit Tebu
            </h2>
            <p className="text-lg md:text-2xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Sistem ini akan membantu Bapak/Ibu petani mengetahui jenis hama atau penyakit 
              yang menyerang tanaman tebu berdasarkan gejala yang terlihat.
            </p>
            
            <div className="bg-amber-100 border-4 border-amber-600 p-4 md:p-8 mb-6 md:mb-10">
              <div className="grid grid-cols-3 gap-3 md:gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-green-900 mb-1 md:mb-2">32</div>
                  <div className="text-sm md:text-xl text-gray-700">Jenis Hama<br className="hidden md:block"/>& Penyakit</div>
                </div>
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-green-900 mb-1 md:mb-2">38</div>
                  <div className="text-sm md:text-xl text-gray-700">Gejala yang<br className="hidden md:block"/>Dapat Dilihat</div>
                </div>
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-green-900 mb-1 md:mb-2">3</div>
                  <div className="text-sm md:text-xl text-gray-700">Bagian Tanaman<br className="hidden md:block"/>Diamati</div>
                </div>
              </div>
            </div>

            <Link
              href="/tebu-konsultasi"
              className="inline-block bg-green-800 text-white px-8 md:px-16 py-4 md:py-6 text-lg md:text-2xl font-bold border-4 border-green-900 hover:bg-green-700 w-full md:w-auto"
            >
              MULAI DIAGNOSIS
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 md:py-16 bg-stone-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-green-900 mb-6 md:mb-12">
            Menu Utama
          </h2>
          <div className="space-y-4 md:space-y-6">
            <Link href="/tebu-konsultasi">
              <div className="bg-white border-4 border-green-800 p-4 md:p-8 hover:bg-green-50">
                <h3 className="text-xl md:text-3xl font-bold text-green-900 mb-2 md:mb-3">1. KONSULTASI DIAGNOSIS</h3>
                <p className="text-base md:text-xl text-gray-700">Mulai pemeriksaan gejala penyakit pada tanaman tebu Anda</p>
              </div>
            </Link>

            <Link href="/tebu-daftar">
              <div className="bg-white border-4 border-amber-700 p-4 md:p-8 hover:bg-amber-50">
                <h3 className="text-xl md:text-3xl font-bold text-amber-900 mb-2 md:mb-3">2. DAFTAR PENYAKIT & HAMA</h3>
                <p className="text-base md:text-xl text-gray-700">Lihat informasi lengkap 32 jenis hama dan penyakit tebu</p>
              </div>
            </Link>

            <Link href="/tebu-admin">
              <div className="bg-white border-4 border-stone-600 p-4 md:p-8 hover:bg-stone-50">
                <h3 className="text-xl md:text-3xl font-bold text-stone-900 mb-2 md:mb-3">3. PANEL ADMIN</h3>
                <p className="text-base md:text-xl text-gray-700">Kelola data sistem (khusus petugas)</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Guide Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-green-900 mb-6 md:mb-12">
            Bagian Tanaman yang Perlu Diamati
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-16">
            <div className="border-4 border-amber-700 bg-white">
              <img 
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop" 
                alt="Akar Tebu"
                className="w-full h-32 md:h-48 object-cover"
              />
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-amber-900 mb-1 md:mb-2">AKAR</h3>
                <p className="text-base md:text-lg text-gray-700">Periksa kondisi akar tanaman tebu</p>
              </div>
            </div>
            <div className="border-4 border-blue-700 bg-white">
              <img 
                src="https://images.unsplash.com/photo-1592921870583-01a3bb9b4f15?w=400&h=300&fit=crop" 
                alt="Batang Tebu"
                className="w-full h-32 md:h-48 object-cover"
              />
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-1 md:mb-2">BATANG</h3>
                <p className="text-base md:text-lg text-gray-700">Amati batang dari pangkal hingga ujung</p>
              </div>
            </div>
            <div className="border-4 border-green-700 bg-white">
              <img 
                src="https://images.unsplash.com/photo-1616680214084-22670ec97171?w=400&h=300&fit=crop" 
                alt="Daun Tebu"
                className="w-full h-32 md:h-48 object-cover"
              />
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-green-900 mb-1 md:mb-2">DAUN</h3>
                <p className="text-base md:text-lg text-gray-700">Perhatikan kondisi dan warna daun</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl md:text-4xl font-bold text-center text-green-900 mb-6 md:mb-12">
            Cara Menggunakan Sistem
          </h2>
          <div className="space-y-4 md:space-y-6">
            <div className="border-l-4 md:border-l-8 border-green-800 bg-amber-50 p-4 md:p-6">
              <h3 className="text-lg md:text-2xl font-bold text-green-900 mb-2">Langkah 1: Amati Tanaman</h3>
              <p className="text-base md:text-xl text-gray-700">Periksa kondisi akar, batang, dan daun tanaman tebu Anda dengan teliti</p>
            </div>
            <div className="border-l-4 md:border-l-8 border-green-800 bg-amber-50 p-4 md:p-6">
              <h3 className="text-lg md:text-2xl font-bold text-green-900 mb-2">Langkah 2: Pilih Gejala</h3>
              <p className="text-base md:text-xl text-gray-700">Centang semua gejala yang terlihat pada tanaman (bisa lebih dari satu)</p>
            </div>
            <div className="border-l-4 md:border-l-8 border-green-800 bg-amber-50 p-4 md:p-6">
              <h3 className="text-lg md:text-2xl font-bold text-green-900 mb-2">Langkah 3: Lihat Hasil</h3>
              <p className="text-base md:text-xl text-gray-700">Sistem akan memberitahu jenis penyakit dan cara mengatasinya</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-6 md:py-12 border-t-4 md:border-t-8 border-amber-700">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <p className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
            SISTEM PAKAR TEBU
          </p>
          <p className="text-base md:text-xl text-amber-100 mb-1 md:mb-2">
            Pabrik Gula Djatiroto
          </p>
          <p className="text-sm md:text-lg text-green-200">
            Diagnosis Hama dan Penyakit Tanaman Tebu
          </p>
        </div>
      </footer>
    </div>
  );
}
