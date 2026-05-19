import { useState } from 'react';
import { Menu, X, Lock, Shield } from 'lucide-react';
import { ACGLogo, ACGLogoHorizontal } from './logos/ACGLogo';
import { btnNav, btnPrimary, focusRing, touchMin } from '@/lib/ui-classes';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  variant?: 'primary' | 'white';
}

export function Navigation({ currentPage, onNavigate, variant = 'primary' }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'services' as Page, label: 'Services' },
    { id: 'process' as Page, label: 'Process' },
    { id: 'about' as Page, label: 'About' },
    { id: 'contact' as Page, label: 'Contact' },
  ];

  const bgColor = variant === 'white' ? 'bg-[#1E1B4B]' : 'bg-[#1E1B4B]';
  const textColor = 'text-white';
  const hoverColor = 'hover:text-[#F97316]';

  const navigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`${bgColor} relative overflow-hidden`} aria-label="Main navigation">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] via-transparent to-[#F97316] opacity-20" />
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <button
          type="button"
          onClick={() => navigate('home')}
          className={`${focusRing} rounded-lg`}
          aria-label="ACG home"
        >
          <div className="hidden md:block">
            <ACGLogo variant="white" size="default" />
          </div>
          <div className="md:hidden">
            <ACGLogoHorizontal variant="white" size="small" />
          </div>
        </button>

        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
              className={`${btnNav} ${textColor} ${hoverColor} ${
                currentPage === item.id ? 'text-[#F97316]' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => navigate('portal')}
            className={`${btnNav} flex items-center gap-2 bg-white/10 text-white hover:bg-white/20`}
          >
            <Lock className="h-4 w-4" aria-hidden />
            Client Portal
          </button>
          <button
            type="button"
            onClick={() => navigate('admin')}
            className={`${btnNav} flex items-center gap-2 bg-white/10 text-white hover:bg-white/20`}
          >
            <Shield className="h-4 w-4" aria-hidden />
            Admin
          </button>
          <button type="button" onClick={() => navigate('contact')} className={btnPrimary}>
            Get Started →
          </button>
        </div>

        <button
          type="button"
          className={`${touchMin} flex items-center justify-center rounded-lg p-2 md:hidden ${textColor} ${focusRing}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className={`${bgColor} border-t border-white/10 md:hidden`}
        >
          <div className="space-y-2 px-4 py-4 pb-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                aria-current={currentPage === item.id ? 'page' : undefined}
                className={`${touchMin} block w-full rounded-lg px-3 py-3 text-left text-base ${textColor} ${hoverColor} ${focusRing} ${
                  currentPage === item.id ? 'bg-white/10 text-[#F97316]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate('portal')}
              className={`${touchMin} flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-white ${focusRing}`}
            >
              <Lock className="h-4 w-4" aria-hidden />
              Client Portal
            </button>
            <button
              type="button"
              onClick={() => navigate('admin')}
              className={`${touchMin} flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-white ${focusRing}`}
            >
              <Shield className="h-4 w-4" aria-hidden />
              Admin Dashboard
            </button>
            <button type="button" onClick={() => navigate('contact')} className={`${btnPrimary} w-full py-4`}>
              Get Started →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
