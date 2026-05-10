import { Rocket, Globe2, TrendingUp, CheckCircle2, ArrowRight, FileText, Home, GraduationCap, Briefcase, Heart, Shield, Clock, DollarSign, Crown, Sparkles, Plane } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO, StructuredData } from '../components/SEO';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface ServicesPageProps {
  onNavigate: (page: Page) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Relocation Services | Visa, Immigration & VIP Services | ACG Ghana"
        description="Comprehensive relocation services from Ghana: Visa & immigration, destination setup, VIP white glove services. Specialized support for UK, Canada, USA, Dubai, Lisbon relocations."
        keywords="visa services Ghana, immigration services Accra, VIP relocation services, white glove relocation, Ghana to UK visa, Ghana to Canada immigration, destination services Ghana"
        canonical="https://acghana.com/services"
      />
      <StructuredData type="Service" />
      <Navigation currentPage="services" onNavigate={onNavigate} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-1 h-32 bg-white rotate-45"></div>
          <div className="absolute bottom-10 left-10 w-1 h-40 bg-white -rotate-45"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl mb-6 tracking-tight" style={{fontWeight: 800}}>
              Ghana to the World.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">We've Got You Covered.</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Whether you're relocating to Europe, North America, or beyond, our Ghana-based team provides end-to-end support tailored for Ghanaian professionals and families.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-20">
            
            {/* Service 1: Visa & Immigration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] transform -skew-x-6 flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-white skew-x-6" />
                </div>
                <h2 className="text-4xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 800}}>
                  Visa & Immigration Services
                </h2>
                <p className="text-[#64748B] text-lg mb-6 leading-relaxed">
                  Moving from Ghana to the UK, Canada, USA, or Europe? We specialize in helping Ghanaian professionals and families secure visas with a 98% success rate.
                </p>
                
                <div className="space-y-3 mb-8">
                  {[
                    "Work permits & employment visas",
                    "Permanent residence applications",
                    "Family sponsorship & dependent visas",
                    "Investor & entrepreneur visas",
                    "Student & education visas",
                    "Fast-track & priority processing"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#6366F1] flex-shrink-0" />
                      <span className="text-[#64748B]">{item}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-8 py-4 hover:shadow-lg transition-all inline-flex items-center gap-2"
                  style={{fontWeight: 700}}
                >
                  Get Visa Consultation <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-1 rounded-lg">
                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-xl text-[#1E1B4B] mb-6" style={{fontWeight: 700}}>What's Included</h3>
                  <div className="space-y-4">
                    {[
                      { icon: FileText, title: "Document Preparation", desc: "Complete application package review" },
                      { icon: Shield, title: "Legal Compliance", desc: "100% compliance with immigration laws" },
                      { icon: Clock, title: "Application Tracking", desc: "Real-time status updates" },
                      { icon: CheckCircle2, title: "Success Guarantee", desc: "We don't stop until approved" }
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 bg-[#6366F1]/10 rounded flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-[#6366F1]" />
                        </div>
                        <div>
                          <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 600}}>{feature.title}</h4>
                          <p className="text-sm text-[#64748B]">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Service 2: Destination Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-[#8B5CF6] to-[#F97316] p-1 rounded-lg">
                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-xl text-[#1E1B4B] mb-6" style={{fontWeight: 700}}>Destination Services</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Home, label: "Home Search" },
                      { icon: GraduationCap, label: "Schools" },
                      { icon: Briefcase, label: "Job Support" },
                      { icon: Heart, label: "Healthcare" },
                      { icon: Globe2, label: "Orientation" },
                      { icon: DollarSign, label: "Banking" }
                    ].map((service, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded text-center">
                        <service.icon className="w-8 h-8 text-[#F97316] mx-auto mb-2" />
                        <p className="text-sm text-[#1E1B4B]" style={{fontWeight: 600}}>{service.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#8B5CF6] to-[#F97316] transform -skew-x-6 flex items-center justify-center mb-6">
                  <Globe2 className="w-8 h-8 text-white skew-x-6" />
                </div>
                <h2 className="text-4xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 800}}>
                  Destination Setup
                </h2>
                <p className="text-[#64748B] text-lg mb-6 leading-relaxed">
                  Arriving in Accra, Dubai, or Lisbon? We help you settle smoothly—from finding housing to school enrollment—so you feel at home from day one.
                </p>
                
                <div className="space-y-3 mb-8">
                  {[
                    "Personalized home search & lease negotiation",
                    "School tours & enrollment assistance",
                    "Cultural orientation & language support",
                    "Banking & financial setup",
                    "Healthcare registration & insurance",
                    "Local network & community connections"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#8B5CF6] flex-shrink-0" />
                      <span className="text-[#64748B]">{item}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#F97316] text-white px-8 py-4 hover:shadow-lg transition-all inline-flex items-center gap-2"
                  style={{fontWeight: 700}}
                >
                  Plan Your Landing <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Service 3: Ongoing Support */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-[#FBBF24] transform -skew-x-6 flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white skew-x-6" />
                </div>
                <h2 className="text-4xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 800}}>
                  Growth & Ongoing Support
                </h2>
                <p className="text-[#64748B] text-lg mb-6 leading-relaxed">
                  Your relocation doesn't end when you land. We provide ongoing support to help you thrive, not just survive, in your new environment.
                </p>
                
                <div className="space-y-3 mb-8">
                  {[
                    "24/7 emergency support hotline",
                    "Career coaching & professional networking",
                    "Business setup & entrepreneurship support",
                    "Renewal & extension assistance",
                    "Family integration programs",
                    "Quarterly check-ins & feedback sessions"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                      <span className="text-[#64748B]">{item}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onNavigate('contact')}
                  className="bg-gradient-to-r from-[#F97316] to-[#FBBF24] text-white px-8 py-4 hover:shadow-lg transition-all inline-flex items-center gap-2"
                  style={{fontWeight: 700}}
                >
                  Get Continuous Support <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#F97316] to-[#FBBF24] p-1 rounded-lg">
                <div className="bg-white p-8 rounded-lg">
                  <h3 className="text-xl text-[#1E1B4B] mb-6" style={{fontWeight: 700}}>Support That Never Stops</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="text-3xl text-[#F97316] mb-2" style={{fontWeight: 800}}>24/7</div>
                      <p className="text-[#64748B]">Emergency support available around the clock</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="text-3xl text-[#F97316] mb-2" style={{fontWeight: 800}}>1-on-1</div>
                      <p className="text-[#64748B]">Dedicated relocation manager for your journey</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="text-3xl text-[#F97316] mb-2" style={{fontWeight: 800}}>Unlimited</div>
                      <p className="text-[#64748B]">No limit on questions or support requests</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service 4: VIP Services */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#C026D3] p-1 rounded-lg">
                <div className="bg-white p-8 rounded-lg">
                  <div className="flex items-center gap-2 mb-6">
                    <Crown className="w-8 h-8 text-[#6366F1]" />
                    <h3 className="text-xl text-[#1E1B4B]" style={{fontWeight: 700}}>VIP White Glove Experience</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <Sparkles className="w-6 h-6 text-[#6366F1] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 600}}>Dedicated Concierge</h4>
                        <p className="text-sm text-[#64748B]">Your personal manager handles every detail, 24/7</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <Plane className="w-6 h-6 text-[#8B5CF6] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 600}}>Premium Partnerships</h4>
                        <p className="text-sm text-[#64748B]">Exclusive access to top-tier housing, schools & networks</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <Shield className="w-6 h-6 text-[#C026D3] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 600}}>Priority Processing</h4>
                        <p className="text-sm text-[#64748B]">Fast-track everything—visas, documents, appointments</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#C026D3]/10 p-4 rounded-lg">
                      <p className="text-sm text-[#1E1B4B]" style={{fontWeight: 600}}>
                        From airport pickup to executive introductions—we handle it all.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#C026D3] transform -skew-x-6 flex items-center justify-center mb-6">
                  <Crown className="w-8 h-8 text-white skew-x-6" />
                </div>
                <h2 className="text-4xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 800}}>
                  VIP White Glove Services
                </h2>
                <p className="text-[#64748B] text-lg mb-6 leading-relaxed">
                  For executives, high-net-worth individuals, and families who demand the absolute best. Every move detail handled with precision, privacy, and premium care.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Personal relocation concierge (24/7 availability)",
                    "Airport meet & greet + luxury transfers",
                    "Exclusive housing viewings & lease negotiation",
                    "Private school tours & enrollment support",
                    "Executive networking & business introductions",
                    "Luxury lifestyle setup (cars, clubs, healthcare)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#6366F1] flex-shrink-0" />
                      <span className="text-[#64748B]">{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#C026D3] text-white px-8 py-4 hover:shadow-lg transition-all inline-flex items-center gap-2"
                  style={{fontWeight: 700}}
                >
                  Request VIP Service <Crown className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl mb-6 tracking-tight" style={{fontWeight: 800}}>
            Not Sure Which Service You Need?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Book a free consultation and we'll create a custom plan tailored to your unique situation.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-white text-[#6366F1] px-12 py-5 hover:bg-[#F97316] hover:text-white transition-all hover:scale-105 shadow-2xl"
            style={{fontWeight: 700}}
          >
            SCHEDULE FREE CONSULTATION →
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
