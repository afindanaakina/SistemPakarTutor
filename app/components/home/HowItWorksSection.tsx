const steps = [
  { title: 'Pelajari Teori', description: 'Mulai dari dasar sistem pakar dan pahami konsep forward & backward chaining.' },
  { title: 'Lihat Demo', description: 'Amati contoh dan proses inferensi dalam aksi.' },
  { title: 'Praktik di Simulator', description: 'Bangun sistem pakar Anda sendiri untuk setiap metode.' },
  { title: 'Eksperimen di Playground', description: 'Bandingkan kedua metode secara berdampingan dengan berbagai kasus.' }
];

export default function HowItWorksSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Cara Belajar
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                {index + 1}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
