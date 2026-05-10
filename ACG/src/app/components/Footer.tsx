import { ACGLogoStacked } from './logos/ACGLogo';
import { Mail, Phone, MapPin } from 'lucide-react';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#1E1B4B] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-1 h-40 bg-white opacity-10 rotate-45"></div>
        <div className="absolute bottom-10 right-10 w-1 h-32 bg-white opacity-10 -rotate-45"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-24 bg-[#F97316] opacity-20 rotate-12"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <ACGLogoStacked variant="white" size="default" />
            <p className="text-white/60 mt-4 text-sm">
              Transforming international moves into launching pads for your next chapter.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4" style={{fontWeight: 700}}>Quick Links</h4>
            <ul className="space-y-2">
              {[
                { id: 'services' as Page, label: 'Services' },
                { id: 'process' as Page, label: 'Our Process' },
                { id: 'about' as Page, label: 'About Us' },
                { id: 'contact' as Page, label: 'Contact' },
                { id: 'portal' as Page, label: 'Client Portal' },
                { id: 'admin' as Page, label: 'Admin Dashboard' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-white/70 hover:text-[#F97316] transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4" style={{fontWeight: 700}}>Our Services</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>Immigration & Visas</li>
              <li>Destination Setup</li>
              <li>Growth Support</li>
              <li>VIP White Glove Service</li>
              <li>24/7 Assistance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4" style={{fontWeight: 700}}>Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#F97316] mt-0.5" />
                <a href="mailto:hello@acghana.com" className="text-white/70 hover:text-[#F97316] transition-colors text-sm">
                  hello@acghana.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#F97316] mt-0.5" />
                <a href="tel:+1234567890" className="text-white/70 hover:text-[#F97316] transition-colors text-sm">
                  +(233) 538-924-044
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F97316] mt-0.5" />
                <span className="text-white/70 text-sm">
                  Accra HQ • Dubai • Lisbon
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm">
            © 2025 Ascend Capital Group. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-[#F97316] transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-[#F97316] transition-colors">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-[#F97316] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}