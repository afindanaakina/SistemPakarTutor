'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductionRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Tebu Expert System (Production-ready system)
    router.replace('/tebu');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-800 mx-auto mb-4"></div>
        <p className="text-xl text-gray-700 mb-2">Mengarahkan ke Sistem Production...</p>
        <p className="text-lg text-gray-600">Sistem Pakar Tebu - Pabrik Gula Djatiroto</p>
      </div>
    </div>
  );
}
