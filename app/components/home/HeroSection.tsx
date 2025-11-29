import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Sistem Pakar Forward & Backward Chaining
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Platform pembelajaran interaktif untuk memahami dan mempraktikkan sistem pakar dengan metode forward chaining dan backward chaining.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/pengenalan"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Mulai Belajar
            </Link>
            <Link
              href="/playground"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-medium transition-colors"
            >
              Coba Playground
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
