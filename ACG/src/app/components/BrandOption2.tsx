import { ArrowRight, Globe, Heart, Sparkles, Menu } from 'lucide-react';

export function BrandOption2() {
  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0D9488] to-[#14B8A6] rounded-full flex items-center justify-center">
              <span className="text-white">ACG</span>
            </div>
            <div>
              <div className="text-[#2D3748]">Ascend Capital Group</div>
              <div className="text-[#0D9488] text-xs">Global Mobility Partners</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[#2D3748]">
            <a href="#services" className="hover:text-[#0D9488] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#0D9488] transition-colors">How It Works</a>
            <a href="#about" className="hover:text-[#0D9488] transition-colors">About Us</a>
            <button className="bg-[#0D9488] text-white px-6 py-2 rounded-full hover:bg-[#0F766E] transition-colors">
              Get Started
            </button>
          </div>
          <button className="md:hidden">
            <Menu className="w-6 h-6 text-[#2D3748]" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0D9488] via-[#14B8A6] to-[#0D9488] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#FF6B6B] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#FFF8F0] rounded-full blur-3xl"></div>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 Q360,20 720,60 T1440,60 L1440,120 L0,120 Z" fill="white" opacity="0.1"/>
        </svg>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
              <span className="text-white text-sm">Trusted by 10,000+ Global Families</span>
            </div>
            <h1 className="text-5xl md:text-6xl mb-6 text-white">
              Your Partner in<br />
              <span className="text-[#FFF8F0]">Life's Big Moves</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Moving to a new country? We're here to guide you every step of the way. From visas to finding your perfect home, we make international relocation personal and simple.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#FF6B6B] text-white px-8 py-4 rounded-full hover:bg-[#FF5252] transition-all hover:scale-105 flex items-center gap-2 shadow-lg">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition-colors border border-white/30">
                Watch Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Countries Covered" },
              { number: "10K+", label: "Successful Relocations" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl text-[#0D9488] mb-2">{stat.number}</div>
                <div className="text-[#64748B] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#FFF8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-[#0D9488] rounded-full"></div>
              <span className="text-[#0D9488] text-sm">What We Do</span>
            </div>
            <h2 className="text-4xl text-[#2D3748] mb-4">
              Services Designed Around You
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">
              We understand that moving is more than logistics—it's about your life, your family, and your dreams. Here's how we help.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                color: "bg-[#0D9488]",
                title: "Immigration Made Simple",
                desc: "Expert visa and immigration support so you can focus on what matters"
              },
              {
                icon: Heart,
                color: "bg-[#FF6B6B]",
                title: "Find Your New Home",
                desc: "Personalized home search, school selection, and neighborhood tours"
              },
              {
                icon: Sparkles,
                color: "bg-[#14B8A6]",
                title: "Settle In With Ease",
                desc: "Ongoing support to help you and your family truly feel at home"
              }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl hover:shadow-xl transition-shadow group">
                <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl text-[#2D3748] mb-3">{service.title}</h3>
                <p className="text-[#64748B] mb-4 leading-relaxed">{service.desc}</p>
                <a href="#" className="text-[#0D9488] hover:text-[#0F766E] inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0D9488] to-[#14B8A6] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl text-white mb-4">
            Let's Make Your Move Happen
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Book a free 30-minute consultation to discuss your unique situation and goals.
          </p>
          <button className="bg-white text-[#0D9488] px-10 py-4 rounded-full hover:bg-[#FFF8F0] transition-all hover:scale-105 shadow-lg">
            Schedule Your Free Consultation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D3748] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0D9488] to-[#14B8A6] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">ACG</span>
              </div>
              <div className="text-white">Ascend Capital Group</div>
            </div>
            <div className="text-white/60 text-sm text-center md:text-right">
              © 2025 Ascend Capital Group. Making global moves personal.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
