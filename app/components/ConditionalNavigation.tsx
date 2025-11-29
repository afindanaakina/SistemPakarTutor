'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Hide navigation for Tebu Expert System routes (completely separate website)
  const isTebuRoute = pathname.startsWith('/tebu') || 
                      pathname === '/sistem-pakar' || 
                      pathname === '/production';
  
  // Hide navigation for Pisang Expert System routes (completely separate website)
  const isPisangRoute = pathname.startsWith('/pisang');
  
  // Don't render navigation for Tebu and Pisang systems
  if (isTebuRoute || isPisangRoute) {
    return null;
  }
  
  // Render navigation for tutorial/learning routes
  return <Navigation />;
}
