import { ACGLogoStacked } from './logos/ACGLogo';
import { Mail, Phone, MapPin } from 'lucide-react';
import { focusRing, touchMin } from '@/lib/ui-classes';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const linkClass = `${touchMin} inline-flex items-center rounded-md py-2 text-sm text-white/70 transition-colors hover:text-[#F97316] ${focusRing}`;

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-[#1E1B4B]" role="contentinfo">
      <div className="absolute inset-0">
        <div className="absolute left-10 top-10 h-40 w-1 rotate-45 bg-white opacity-10" />
        <div className="absolute bottom-10 right-10 h-32 w-1 -rotate-45 bg-white opacity-10" />
        <div className="absolute right-1/4 top-1/2 h-24 w-1 rotate-12 bg-[#F97316] opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
          <div>
            <ACGLogoStacked variant="white" size="default" />
            <p className="mt-4 text-sm text-white/60">
              Transforming international moves into launching pads for your next chapter.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h4 className="mb-4 text-white" style={{ fontWeight: 700 }}>
              Quick Links
            </h4>
            <ul className="space-y-1">
              {[
                { id: 'services' as Page, label: 'Services' },
                { id: 'process' as Page, label: 'Our Process' },
                { id: 'about' as Page, label: 'About Us' },
                { id: 'contact' as Page, label: 'Contact' },
                { id: 'portal' as Page, label: 'Client Portal' },
              ].map((link) => (
                <li key={link.id}>
                  <button type="button" onClick={() => onNavigate(link.id)} className={linkClass}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="mb-4 text-white" style={{ fontWeight: 700 }}>
              Our Services
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Immigration & Visas</li>
              <li>Destination Setup</li>
              <li>Growth Support</li>
              <li>VIP White Glove Service</li>
              <li>24/7 Assistance</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-white" style={{ fontWeight: 700 }}>
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#F97316]" aria-hidden />
                <a href="mailto:hello@acghana.com" className={linkClass}>
                  hello@acghana.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#F97316]" aria-hidden />
                <a href="tel:+233538924044" className={linkClass}>
                  +(233) 538-924-044
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F97316]" aria-hidden />
                <span className="text-sm text-white/70">Accra HQ • Dubai • Lisbon</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row">
          <div>© 2025 Ascend Capital Group. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#" className={linkClass}>
              Privacy Policy
            </a>
            <a href="#" className={linkClass}>
              Terms of Service
            </a>
            <a href="#" className={linkClass}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
