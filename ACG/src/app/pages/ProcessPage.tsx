import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { MessageSquare, Search, FileCheck, Plane, Home, TrendingUp, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface ProcessPageProps {
  onNavigate: (page: Page) => void;
}

export function ProcessPage({ onNavigate }: ProcessPageProps) {
  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      icon: MessageSquare,
      duration: "30 minutes",
      description: "We start with a free consultation to understand your goals, timeline, and unique situation.",
      details: [
        "Understand your relocation needs",
        "Assess visa & immigration requirements",
        "Discuss budget and timeline",
        "Answer all your burning questions"
      ],
      gradient: "from-[#6366F1] to-[#8B5CF6]"
    },
    {
      number: "02",
      title: "Custom Strategy",
      icon: Search,
      duration: "3-5 days",
      description: "Our team creates a personalized relocation roadmap tailored to your specific needs.",
      details: [
        "Detailed immigration strategy",
        "Timeline with key milestones",
        "Budget breakdown & cost estimates",
        "Risk assessment & contingency plans"
      ],
      gradient: "from-[#8B5CF6] to-[#A855F7]"
    },
    {
      number: "03",
      title: "Documentation & Approval",
      icon: FileCheck,
      duration: "4-12 weeks",
      description: "We handle all the paperwork, applications, and follow-ups to secure your approvals.",
      details: [
        "Complete document preparation",
        "Submit visa applications",
        "Track application status 24/7",
        "Handle any additional requests"
      ],
      gradient: "from-[#A855F7] to-[#C026D3]"
    },
    {
      number: "04",
      title: "Pre-Arrival Setup",
      icon: Plane,
      duration: "2-4 weeks",
      description: "Before you land, we set everything up so you can hit the ground running.",
      details: [
        "Home search & lease negotiation",
        "School enrollment (if applicable)",
        "Banking & financial accounts",
        "Healthcare & insurance setup"
      ],
      gradient: "from-[#C026D3] to-[#F97316]"
    },
    {
      number: "05",
      title: "Landing Support",
      icon: Home,
      duration: "First 30 days",
      description: "We're with you on arrival to ensure a smooth transition into your new life.",
      details: [
        "Airport pickup & orientation",
        "Move-in assistance",
        "Local registration & permits",
        "Cultural orientation sessions"
      ],
      gradient: "from-[#F97316] to-[#FB923C]"
    },
    {
      number: "06",
      title: "Growth & Thrive",
      icon: TrendingUp,
      duration: "Ongoing",
      description: "Continuous support to help you not just settle, but truly thrive in your new home.",
      details: [
        "24/7 support hotline",
        "Career & networking support",
        "Family integration programs",
        "Quarterly check-ins"
      ],
      gradient: "from-[#FB923C] to-[#FBBF24]"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="process" onNavigate={onNavigate} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-1 h-32 bg-white rotate-45"></div>
          <div className="absolute bottom-10 left-10 w-1 h-40 bg-white -rotate-45"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl mb-6 tracking-tight" style={{fontWeight: 800}}>
              Your Relocation<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">Step by Step</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              A proven 6-step process that's guided 10,000+ successful relocations across the globe. Simple, transparent, and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-24 bottom-0 w-1 bg-gradient-to-b from-gray-300 to-transparent hidden md:block"></div>
                )}
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Icon & Number */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-lg flex items-center justify-center mb-4 relative z-10`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`text-5xl bg-gradient-to-br ${step.gradient} text-transparent bg-clip-text`} style={{fontWeight: 800}}>
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-3xl text-[#1E1B4B] tracking-tight" style={{fontWeight: 800}}>
                        {step.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm text-[#64748B]">
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </span>
                    </div>
                    
                    <p className="text-[#64748B] text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="text-[#1E1B4B] mb-4" style={{fontWeight: 700}}>What Happens:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 text-[#6366F1]`} />
                            <span className="text-[#64748B] text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Visual */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 800}}>
              Typical Timeline
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Most relocations complete within 3-6 months from start to landing. Here's what to expect:
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="space-y-6">
              {[
                { phase: "Weeks 1-2", activity: "Discovery & Strategy", color: "bg-[#6366F1]" },
                { phase: "Weeks 3-14", activity: "Documentation & Visa Processing", color: "bg-[#8B5CF6]" },
                { phase: "Weeks 15-18", activity: "Pre-Arrival Setup", color: "bg-[#C026D3]" },
                { phase: "Week 19+", activity: "Landing & Integration", color: "bg-[#F97316]" },
                { phase: "Ongoing", activity: "Growth Support", color: "bg-[#FBBF24]" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 text-[#64748B]" style={{fontWeight: 600}}>{item.phase}</div>
                  <div className={`flex-1 h-12 ${item.color} rounded flex items-center px-6 text-white`} style={{fontWeight: 600}}>
                    {item.activity}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-[#6366F1]/10 to-[#F97316]/10 rounded-lg">
              <p className="text-[#1E1B4B] text-center">
                <span style={{fontWeight: 700}}>Note:</span> Timeline varies by destination country and visa type. We'll provide exact timelines during your consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 800}}>
              Why Our Process Works
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              We've refined our approach over 10+ years and 10,000+ relocations. Here's what sets us apart:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Fully Transparent",
                desc: "No hidden fees, no surprises. You know exactly what's happening at every stage.",
                gradient: "from-[#6366F1] to-[#8B5CF6]"
              },
              {
                title: "Tech-Enabled",
                desc: "Real-time tracking, digital document vault, and 24/7 portal access to monitor progress.",
                gradient: "from-[#8B5CF6] to-[#F97316]"
              },
              {
                title: "Human-Centered",
                desc: "Technology accelerates, but humans deliver. Your dedicated manager is always a call away.",
                gradient: "from-[#F97316] to-[#FBBF24]"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-transparent hover:border-[#6366F1] transition-all">
                <div className={`inline-block text-2xl bg-gradient-to-r ${feature.gradient} text-transparent bg-clip-text mb-4`} style={{fontWeight: 800}}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl text-[#1E1B4B] mb-3" style={{fontWeight: 700}}>{feature.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl mb-6 tracking-tight" style={{fontWeight: 800}}>
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Book your free consultation and we'll walk you through the exact process for your unique situation.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-white text-[#6366F1] px-12 py-5 hover:bg-[#F97316] hover:text-white transition-all hover:scale-105 shadow-2xl inline-flex items-center gap-3"
            style={{fontWeight: 700}}
          >
            BOOK FREE CONSULTATION
            <ArrowRight className="w-6 h-6" />
          </button>
          <p className="text-white/70 text-sm mt-6">30 minutes · Zero commitment · Expert guidance</p>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
