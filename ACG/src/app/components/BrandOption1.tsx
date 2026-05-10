import { ArrowRight, Globe, Users, Shield, ChevronDown } from 'lucide-react';

export function BrandOption1() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Navigation */}
      <nav className="bg-[#0A2540] border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center">
              <div className="text-[#D4AF37] -rotate-45 text-xs tracking-widest">ACG</div>
            </div>
            <div>
              <div className="text-[#D4AF37] tracking-widest text-sm" style={{fontFamily: 'serif'}}>ASCEND</div>
              <div className="text-[#F5F5F0] text-xs tracking-wider opacity-80">CAPITAL GROUP</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[#F5F5F0] text-sm">
            <a href="#services" className="hover:text-[#D4AF37] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#D4AF37] transition-colors">Our Process</a>
            <a href="#about" className="hover:text-[#D4AF37] transition-colors">About</a>
            <button className="bg-[#D4AF37] text-[#0A2540] px-6 py-2 hover:bg-[#C19A2E] transition-colors">
              Book Consultation
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0A2540] to-[#1a3a5f] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 border border-[#D4AF37] rotate-45"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 border border-[#D4AF37] rotate-12"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37] px-4 py-2 mb-6">
              <span className="text-[#D4AF37] text-sm tracking-widest">GLOBAL MOBILITY EXPERTS</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-white" style={{fontFamily: 'serif'}}>
              Your Journey to<br />
              <span className="text-[#D4AF37]">Global Success</span>
            </h1>
            <p className="text-xl text-[#F5F5F0]/80 mb-8 leading-relaxed">
              Seamless international relocation and mobility solutions tailored for discerning professionals and their families. We handle every detail with precision and care.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#D4AF37] text-[#0A2540] px-8 py-4 hover:bg-[#C19A2E] transition-colors flex items-center gap-2">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-[#F5F5F0] text-[#F5F5F0] px-8 py-4 hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
          <ChevronDown className="w-8 h-8 text-[#D4AF37] mx-auto animate-bounce" />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#D4AF37] tracking-widest text-sm mb-4">OUR SERVICES</div>
            <h2 className="text-4xl text-[#0A2540] mb-4" style={{fontFamily: 'serif'}}>
              Comprehensive Global Solutions
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">
              Every relocation is unique. Our bespoke services ensure your transition is seamless, efficient, and stress-free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Immigration & Visa Services",
                desc: "Expert guidance through complex immigration processes worldwide"
              },
              {
                icon: Users,
                title: "Destination Services",
                desc: "Home search, school selection, and cultural orientation"
              },
              {
                icon: Shield,
                title: "Ongoing Support",
                desc: "Continuous assistance to ensure your long-term success"
              }
            ].map((service, i) => (
              <div key={i} className="bg-[#F5F5F0] p-8 hover:shadow-lg transition-shadow group">
                <div className="w-16 h-16 bg-[#0A2540] flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
                  <service.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-[#0A2540]" />
                </div>
                <h3 className="text-xl text-[#0A2540] mb-3" style={{fontFamily: 'serif'}}>{service.title}</h3>
                <p className="text-[#64748B] mb-4">{service.desc}</p>
                <a href="#" className="text-[#D4AF37] hover:text-[#C19A2E] text-sm tracking-wide inline-flex items-center gap-2">
                  LEARN MORE <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0A2540] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl text-[#D4AF37] mb-4" style={{fontFamily: 'serif'}}>
            Ready to Begin Your Global Journey?
          </h2>
          <p className="text-[#F5F5F0] mb-8 max-w-2xl mx-auto">
            Schedule a confidential consultation with our expert team to discuss your unique needs.
          </p>
          <button className="bg-[#D4AF37] text-[#0A2540] px-10 py-4 hover:bg-[#C19A2E] transition-colors">
            Book Your Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2540] border-t border-[#D4AF37]/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-[#D4AF37] tracking-widest mb-2">ASCEND CAPITAL GROUP</div>
          <p className="text-[#F5F5F0]/60 text-sm">© 2025 ACG. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
