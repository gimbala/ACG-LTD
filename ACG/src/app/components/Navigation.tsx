import { useState } from 'react';
import { Menu, X, Lock, Shield } from 'lucide-react';
import { ACGLogo, ACGLogoHorizontal } from './logos/ACGLogo';

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

  const isWhite = variant === 'white';
  const textColor = isWhite ? 'text-white' : 'text-white';
  const hoverColor = isWhite ? 'hover:text-[#F97316]' : 'hover:text-[#F97316]';
  const bgColor = isWhite ? 'bg-[#1E1B4B]' : 'bg-[#1E1B4B]';

  return (
    <nav className={`${bgColor} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] via-transparent to-[#F97316] opacity-20"></div>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        <button onClick={() => onNavigate('home')} className="focus:outline-none">
          <div className="hidden md:block">
            <ACGLogo variant="white" size="default" />
          </div>
          <div className="md:hidden">
            <ACGLogoHorizontal variant="white" size="small" />
          </div>
        </button>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`${textColor} ${hoverColor} transition-colors ${
                currentPage === item.id ? 'text-[#F97316]' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate('portal')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded transition-all"
          >
            <Lock className="w-4 h-4" />
            Client Portal
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded transition-all"
          >
            <Shield className="w-4 h-4" />
            Admin
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-6 py-2 hover:shadow-lg hover:scale-105 transition-all"
          >
            Get Started →
          </button>
        </div>
        
        <button 
          className={`md:hidden ${textColor}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${bgColor} border-t border-white/10`}>
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left ${textColor} ${hoverColor} transition-colors py-2 ${
                  currentPage === item.id ? 'text-[#F97316]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('portal');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded transition-all"
            >
              <Lock className="w-4 h-4" />
              Client Portal
            </button>
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded transition-all"
            >
              <Shield className="w-4 h-4" />
              Admin Dashboard
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-6 py-3 hover:shadow-lg transition-all"
            >
              Get Started →
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
