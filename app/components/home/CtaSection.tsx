import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Siap Memulai Belajar?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Mulai perjalanan Anda untuk menguasai sistem pakar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/pengenalan"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-medium text-lg transition-colors"
          >
            Mulai Belajar Sekarang
          </Link>
          <Link
            href="/tebu"
            className="inline-block bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 font-medium text-lg transition-colors border-2 border-green-800"
          >
            🌾 Sistem Pakar Tebu
          </Link>
          <Link
            href="/pisang"
            className="inline-block bg-yellow-600 text-white px-8 py-4 rounded-lg hover:bg-yellow-700 font-medium text-lg transition-colors border-2 border-yellow-700"
          >
            🍌 Sistem Pakar Pisang
          </Link>
        </div>
        <div className="mt-6 space-y-2">
          <p className="text-sm text-gray-500">
            <strong>Sistem Pakar Tebu:</strong> Production system • Diagnosis hama & penyakit tebu • 32 database • Traditional agricultural UI
          </p>
          <p className="text-sm text-gray-500">
            <strong>Sistem Pakar Pisang:</strong> Production system • Diagnosis penyakit & hama pisang • 10 database • Forward chaining
          </p>
        </div>
      </div>
    </section>
  );
}
