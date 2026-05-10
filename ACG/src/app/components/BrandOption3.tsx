import { ArrowRight, Zap, Rocket, TrendingUp, Menu, X } from 'lucide-react';

export function BrandOption3() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-[#1E1B4B] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] via-transparent to-[#F97316] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#F97316] transform -skew-x-12 flex items-center justify-center">
                <span className="text-white skew-x-12">ACG</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F97316] rounded-full animate-pulse"></div>
            </div>
            <div>
              <div className="text-white tracking-tight" style={{fontWeight: 700}}>ASCEND CAPITAL GROUP</div>
              <div className="text-[#F97316] text-xs tracking-widest">ELEVATE YOUR WORLD</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-white">
            <a href="#services" className="hover:text-[#F97316] transition-colors">Services</a>
            <a href="#process" className="hover:text-[#F97316] transition-colors">Process</a>
            <a href="#about" className="hover:text-[#F97316] transition-colors">About</a>
            <button className="bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-6 py-2 hover:shadow-lg hover:scale-105 transition-all">
              Let's Go →
            </button>
          </div>
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-1 h-32 bg-white opacity-40 rotate-45 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-24 bg-[#F97316] opacity-60 -rotate-45"></div>
          <div className="absolute bottom-20 left-1/3 w-1 h-40 bg-white opacity-30 rotate-12"></div>
          <div className="absolute bottom-32 right-20 w-1 h-28 bg-[#F97316] opacity-50 -rotate-12 animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-[#F97316]" />
              <span className="text-white text-sm tracking-wider uppercase">Transforming Lives Globally</span>
            </div>
            <h1 className="text-6xl md:text-7xl mb-6 text-white tracking-tight" style={{fontWeight: 800}}>
              Don't Just Move.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">Ascend.</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Bold relocations for bold people. We turn international moves into launching pads for your next chapter. Fast. Fearless. Forward.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-[#F97316] to-[#FBBF24] text-[#1E1B4B] px-10 py-5 hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2 group" style={{fontWeight: 700}}>
                START NOW 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 hover:bg-white/20 transition-colors border border-white/30" style={{fontWeight: 700}}>
                SEE HOW IT WORKS
              </button>
            </div>
          </div>
        </div>
        {/* Animated gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-white py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#6366F1] to-[#F97316] p-1 shadow-2xl">
            <div className="bg-white p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "50+", label: "Countries", icon: "🌍" },
                  { number: "10K+", label: "Moves Completed", icon: "🚀" },
                  { number: "72hrs", label: "Avg. Response Time", icon: "⚡" },
                  { number: "100%", label: "Commitment", icon: "💯" }
                ].map((stat, i) => (
                  <div key={i} className="group hover:scale-110 transition-transform">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <div className="text-5xl bg-gradient-to-r from-[#6366F1] to-[#F97316] text-transparent bg-clip-text mb-2" style={{fontWeight: 800}}>{stat.number}</div>
                    <div className="text-[#1E1B4B] text-sm uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-[#6366F1] to-[#F97316] text-transparent bg-clip-text mb-4">
              <span className="text-sm tracking-widest uppercase" style={{fontWeight: 700}}>What We Do</span>
            </div>
            <h2 className="text-5xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 800}}>
              Three Moves. One Mission.
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto text-lg">
              We've distilled international relocation into three powerful services that get you where you need to go.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                gradient: "from-[#6366F1] to-[#8B5CF6]",
                title: "Visa & Immigration",
                desc: "Cut through red tape. We accelerate your immigration process with expert precision.",
                accent: "border-l-4 border-[#6366F1]"
              },
              {
                icon: TrendingUp,
                gradient: "from-[#8B5CF6] to-[#F97316]",
                title: "Destination Setup",
                desc: "Land running. Home, schools, networks—we set up your new life before you arrive.",
                accent: "border-l-4 border-[#8B5CF6]"
              },
              {
                icon: Zap,
                gradient: "from-[#F97316] to-[#FBBF24]",
                title: "Growth Support",
                desc: "Thrive, don't just survive. Ongoing guidance to maximize your global opportunity.",
                accent: "border-l-4 border-[#F97316]"
              }
            ].map((service, i) => (
              <div key={i} className={`bg-white p-8 shadow-lg hover:shadow-2xl transition-all group ${service.accent} hover:-translate-y-2`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} transform -skew-x-6 flex items-center justify-center mb-6 group-hover:skew-x-0 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white skew-x-6 group-hover:skew-x-0" />
                </div>
                <h3 className="text-2xl text-[#1E1B4B] mb-3 tracking-tight" style={{fontWeight: 700}}>{service.title}</h3>
                <p className="text-[#64748B] mb-6 leading-relaxed">{service.desc}</p>
                <a href="#" className="text-[#6366F1] hover:text-[#F97316] inline-flex items-center gap-2 group/link transition-colors uppercase text-sm tracking-wider" style={{fontWeight: 700}}>
                  Explore <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-[#1E1B4B] via-[#6366F1] to-[#F97316] py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-1 h-40 bg-white opacity-30 rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-1 h-32 bg-white opacity-40 -rotate-45"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl text-white mb-6 tracking-tight" style={{fontWeight: 800}}>
            Your Next Chapter<br />Starts Right Now
          </h2>
          <p className="text-white/90 mb-10 text-xl max-w-2xl mx-auto">
            Book a free strategy session. Let's map out your move and make it happen.
          </p>
          <button className="bg-white text-[#6366F1] px-12 py-5 hover:bg-[#F97316] hover:text-white transition-all hover:scale-110 shadow-2xl text-lg" style={{fontWeight: 700}}>
            BOOK YOUR SESSION NOW →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1B4B] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#F97316] transform -skew-x-12 flex items-center justify-center">
                <span className="text-white skew-x-12 text-sm">ACG</span>
              </div>
              <div>
                <div className="text-white" style={{fontWeight: 700}}>ASCEND CAPITAL GROUP</div>
                <div className="text-[#F97316] text-xs tracking-widest">ELEVATE YOUR WORLD</div>
              </div>
            </div>
            <div className="text-white/60 text-sm">
              © 2025 ACG. Made for movers and shakers.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
