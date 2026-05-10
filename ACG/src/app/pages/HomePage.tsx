import { ArrowRight, Zap, Rocket, TrendingUp, Globe2, Users, Shield, CheckCircle2, Star, ChevronRight } from 'lucide-react';
import { SITE_ORIGIN } from '@/lib/site';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO, StructuredData } from '../components/SEO';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Ascend Capital Group | Ghana-Based Global Relocation Services"
        description="Expert visa, immigration, and relocation services from Ghana to UK, Canada, USA, Dubai, and Lisbon. 98% success rate. Ghana's trusted global mobility partner."
        keywords="Ghana relocation services, immigration services Ghana, visa assistance Ghana, relocation to UK from Ghana, Canada immigration Ghana, USA visa Ghana, Dubai relocation, Lisbon relocation, Accra immigration services"
        canonical={`${SITE_ORIGIN}/`}
      />
      <StructuredData type="Organization" />
      <Navigation currentPage="home" onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-1 h-32 bg-white opacity-40 rotate-45 animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-24 bg-[#F97316] opacity-60 -rotate-45"></div>
          <div className="absolute bottom-20 left-1/3 w-1 h-40 bg-white opacity-30 rotate-12"></div>
          <div className="absolute bottom-32 right-20 w-1 h-28 bg-[#F97316] opacity-50 -rotate-12 animate-pulse"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-white/10 transform rotate-45"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-white/10 transform -rotate-12"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-8 animate-fade-in">
              <Zap className="w-4 h-4 text-[#F97316]" />
              <span className="text-white text-sm tracking-wider uppercase">Ghana-Based • Global Reach • Since 2019</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 text-white tracking-tight leading-tight" style={{fontWeight: 800}}>
              Don't Just Move.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FBBF24] to-[#F97316]">Ascend.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl">
              Bold relocations for bold people. We turn international moves into launching pads for your next chapter. <span className="text-[#F97316]">Fast. Fearless. Forward.</span>
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => onNavigate('contact')}
                className="bg-gradient-to-r from-[#F97316] to-[#FBBF24] text-[#1E1B4B] px-10 py-5 hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2 group" 
                style={{fontWeight: 700}}
              >
                START YOUR JOURNEY NOW 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('process')}
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-5 hover:bg-white/20 transition-colors border border-white/30" 
                style={{fontWeight: 700}}
              >
                SEE HOW IT WORKS
              </button>
            </div>

            {/* Trust indicators removed */}
          </div>
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-white py-16 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#6366F1] to-[#F97316] p-1 shadow-2xl">
            <div className="bg-white p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "10+", label: "Countries Covered", icon: "🌍" },
                  { number: "50+", label: "Moves Completed", icon: "🚀" },
                  { number: "48hrs", label: "Avg. Response", icon: "⚡" },
                  { number: "98%", label: "Client Satisfaction", icon: "💯" }
                ].map((stat, i) => (
                  <div key={i} className="group hover:scale-110 transition-transform cursor-pointer">
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-5xl md:text-6xl bg-gradient-to-r from-[#6366F1] to-[#F97316] text-transparent bg-clip-text mb-2" style={{fontWeight: 800}}>{stat.number}</div>
                    <div className="text-[#1E1B4B] text-sm uppercase tracking-wider" style={{fontWeight: 600}}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-[#6366F1] to-[#F97316] text-transparent bg-clip-text mb-4">
              <span className="text-sm tracking-widest uppercase" style={{fontWeight: 700}}>What We Do</span>
            </div>
            <h2 className="text-5xl md:text-6xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 800}}>
              Three Moves. One Mission.
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto text-xl">
              We've distilled international relocation into three powerful services that get you where you need to go.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                gradient: "from-[#6366F1] to-[#8B5CF6]",
                title: "Visa & Immigration",
                desc: "Cut through red tape. We accelerate your immigration process with expert precision and insider knowledge.",
                features: ["Work Permits", "Residence Visas", "Family Sponsorship", "Fast-Track Processing"],
                accent: "border-l-4 border-[#6366F1]"
              },
              {
                icon: Globe2,
                gradient: "from-[#8B5CF6] to-[#F97316]",
                title: "Destination Setup",
                desc: "Land running. Home, schools, networks—we set up your new life before you even arrive.",
                features: ["Home Search", "School Selection", "Local Network", "Cultural Orientation"],
                accent: "border-l-4 border-[#8B5CF6]"
              },
              {
                icon: TrendingUp,
                gradient: "from-[#F97316] to-[#FBBF24]",
                title: "Growth Support",
                desc: "Thrive, don't just survive. Ongoing guidance to maximize your global opportunity.",
                features: ["Career Coaching", "Business Setup", "Community Access", "24/7 Assistance"],
                accent: "border-l-4 border-[#F97316]"
              }
            ].map((service, i) => (
              <div key={i} className={`bg-white p-8 shadow-lg hover:shadow-2xl transition-all group ${service.accent} hover:-translate-y-2`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} transform -skew-x-6 flex items-center justify-center mb-6 group-hover:skew-x-0 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white skew-x-6 group-hover:skew-x-0" />
                </div>
                <h3 className="text-2xl text-[#1E1B4B] mb-3 tracking-tight" style={{fontWeight: 700}}>{service.title}</h3>
                <p className="text-[#64748B] mb-6 leading-relaxed">{service.desc}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#64748B]">
                      <CheckCircle2 className="w-4 h-4 text-[#6366F1]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => onNavigate('services')}
                  className="text-[#6366F1] hover:text-[#F97316] inline-flex items-center gap-2 group/link transition-colors uppercase text-sm tracking-wider" 
                  style={{fontWeight: 700}}
                >
                  Learn More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ACG */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-[#6366F1] to-[#F97316] text-transparent bg-clip-text mb-4">
                <span className="text-sm tracking-widest uppercase" style={{fontWeight: 700}}>Why ACG</span>
              </div>
              <h2 className="text-4xl md:text-5xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 800}}>
                We Don't Just Move People. We Move Mountains.
              </h2>
              <p className="text-[#64748B] text-lg mb-8 leading-relaxed">
                Based in Ghana with hubs in Dubai and Lisbon, we've spent over a decade helping African professionals and families relocate worldwide. From Accra to London, Lagos to Toronto—we've seen it all and conquered it all.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Battle-Tested Expertise",
                    desc: "5+ years navigating complex immigration systems worldwide"
                  },
                  {
                    icon: Zap,
                    title: "Lightning-Fast Execution",
                    desc: "We move at your speed. No delays, no excuses, just results"
                  },
                  {
                    icon: Users,
                    title: "White-Glove Service",
                    desc: "Dedicated relocation manager for your entire journey"
                  }
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#F97316] rounded flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 700}}>{benefit.title}</h4>
                      <p className="text-[#64748B] text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onNavigate('about')}
                className="mt-8 bg-[#1E1B4B] text-white px-8 py-4 hover:bg-gradient-to-r hover:from-[#6366F1] hover:to-[#F97316] transition-all inline-flex items-center gap-2"
                style={{fontWeight: 700}}
              >
                Our Story <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#6366F1] to-[#F97316] rounded-lg p-1">
                <div className="w-full h-full bg-white rounded-lg p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Star className="w-20 h-20 text-[#F97316] mx-auto mb-6" />
                    <div className="text-6xl text-[#1E1B4B] mb-4" style={{fontWeight: 800}}>4.9/5</div>
                    <p className="text-[#64748B] text-lg mb-6">Average Client Rating</p>
                    <div className="flex justify-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-6 h-6 fill-[#F97316] text-[#F97316]" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-xl border-l-4 border-[#6366F1]">
                <div className="text-3xl text-[#6366F1] mb-1" style={{fontWeight: 800}}>100%</div>
                <div className="text-xs text-[#64748B]">Success Rate</div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-l-4 border-[#F97316]">
                <div className="text-3xl text-[#F97316] mb-1" style={{fontWeight: 800}}>24/7</div>
                <div className="text-xs text-[#64748B]">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-[#1E1B4B] via-[#6366F1] to-[#F97316] py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-1 h-40 bg-white opacity-30 rotate-45"></div>
          <div className="absolute bottom-10 right-10 w-1 h-32 bg-white opacity-40 -rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-28 bg-white opacity-25 rotate-12"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight" style={{fontWeight: 800}}>
            Your Next Chapter<br />Starts Right Now
          </h2>
          <p className="text-white/90 mb-10 text-xl max-w-2xl mx-auto leading-relaxed">
            Book a free 30-minute strategy session. Let's map out your move and make it happen. No pressure, just expert guidance.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-white text-[#6366F1] px-12 py-5 hover:bg-[#F97316] hover:text-white transition-all hover:scale-110 shadow-2xl text-lg inline-flex items-center gap-3" 
            style={{fontWeight: 700}}
          >
            BOOK YOUR FREE SESSION NOW 
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <p className="text-white/70 text-sm mt-6">Free consultation · No commitment · Expert advice in 30 minutes</p>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}