'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { Home, Globe, Zap, Clock, CheckSquare } from 'lucide-react';
import { WebSocketStatus } from './WebSocketStatus';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/ssr', label: 'SSR', icon: Globe },
    { href: '/ssg', label: 'SSG', icon: Zap },
    { href: '/isr', label: 'ISR', icon: Clock },
    { href: '/csr', label: 'CSR', icon: CheckSquare },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            ToDo
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
            <WebSocketStatus />
          </div>
        </div>
      </div>
    </nav>
  );
}
