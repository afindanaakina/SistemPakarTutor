'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigationItems = [
  { href: '/', label: 'Beranda' },
  { href: '/pengenalan', label: 'Teori Dasar' },
  { href: '/materi', label: 'Forward Chaining' },
  { href: '/backward', label: 'Backward Chaining' },
  { href: '/playground', label: 'Playground' },
  { href: '/tebu', label: '🌾 Sistem Pakar Tebu', highlight: true },
  { href: '/pisang', label: '🍌 Sistem Pakar Pisang', highlight: true, color: 'yellow' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo - Compact */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                <span className="hidden sm:inline">Sistem Pakar</span>
                <span className="sm:hidden">SP</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-4 lg:space-x-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const isHighlight = 'highlight' in item && item.highlight;
              const itemColor = 'color' in item ? item.color : 'green';
              
              const colorClasses = itemColor === 'yellow' 
                ? {
                    active: 'border-yellow-600 text-yellow-700 font-bold',
                    hover: 'border-transparent text-yellow-600 hover:border-yellow-300 hover:text-yellow-700 font-semibold'
                  }
                : {
                    active: 'border-green-600 text-green-700 font-bold',
                    hover: 'border-transparent text-green-600 hover:border-green-300 hover:text-green-700 font-semibold'
                  };
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-2 lg:px-3 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive
                      ? isHighlight
                        ? colorClasses.active
                        : 'border-blue-500 text-gray-900'
                      : isHighlight
                        ? colorClasses.hover
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu</span>
              {/* Hamburger Icon */}
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const isHighlight = 'highlight' in item && item.highlight;
              const itemColor = 'color' in item ? item.color : 'green';
              
              const mobileColorClasses = itemColor === 'yellow'
                ? {
                    active: 'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-600 font-bold',
                    hover: 'text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700 font-semibold'
                  }
                : {
                    active: 'bg-green-50 text-green-700 border-l-4 border-green-600 font-bold',
                    hover: 'text-green-600 hover:bg-green-50 hover:text-green-700 font-semibold'
                  };
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? isHighlight
                        ? mobileColorClasses.active
                        : 'bg-blue-50 text-blue-600 border-l-4 border-blue-500'
                      : isHighlight
                        ? mobileColorClasses.hover
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
