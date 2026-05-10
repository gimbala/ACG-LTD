import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Target, Users, Award, Globe2, Heart, Zap, TrendingUp, Shield } from 'lucide-react';
import { SITE_ORIGIN } from '@/lib/site';
import { SEO, StructuredData } from '../components/SEO';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About ACG | Ghana's Leading Global Relocation Company"
        description="Founded in Accra, Ghana with hubs in Dubai and Lisbon. 5+ years helping Ghanaian professionals relocate worldwide. Expert team, proven track record, 100+ success stories."
        keywords="about ACG Ghana, Ghana relocation company, Accra immigration experts, global mobility Ghana, international relocation Ghana, Ghana to world migration"
        canonical={`${SITE_ORIGIN}/about`}
      />
      <StructuredData type="LocalBusiness" />
      <Navigation currentPage="about" onNavigate={onNavigate} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-1 h-32 bg-white rotate-45"></div>
          <div className="absolute bottom-10 left-10 w-1 h-40 bg-white -rotate-45"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl mb-6 tracking-tight" style={{fontWeight: 800}}>
              We Move People.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">We Transform Lives.</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              For over a decade, Ascend Capital Group has been the trusted partner behind thousands of successful global relocations.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-[#6366F1] to-[#F97316] text-transparent bg-clip-text mb-4">
                <span className="text-sm tracking-widest uppercase" style={{fontWeight: 700}}>Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 800}}>
                Born from Experience
              </h2>
              <div className="space-y-4 text-[#64748B] leading-relaxed">
                <p>
                  ACG was founded in 2019 in Accra, Ghana, by a group of diaspora friends and relocation specialists who experienced firsthand the chaos and stress of international moves.
                </p>
                <p>
                  We saw brilliant Ghanaians, Diasporians, and African professionals stuck in visa limbo. Families struggling to find homes in unfamiliar cities. Talented individuals losing opportunities because of bureaucratic red tape.
                </p>
                <p>
                  We knew there had to be a better way. So we built it.
                </p>
                <p>
                  Today, we're headquartered in Accra with strategic hubs in Dubai and Lisbon, backed by a global team of 20+ experts across 5 countries—all united by one mission: to make international relocation seamless, efficient, and empowering.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-8 rounded-lg text-white">
                <div className="text-5xl mb-3" style={{fontWeight: 800}}>5+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </div>
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#C026D3] p-8 rounded-lg text-white">
                <div className="text-5xl mb-3" style={{fontWeight: 800}}>15+</div>
                <div className="text-sm opacity-90">Team Members</div>
              </div>
              <div className="bg-gradient-to-br from-[#C026D3] to-[#F97316] p-8 rounded-lg text-white">
                <div className="text-5xl mb-3" style={{fontWeight: 800}}>5+</div>
                <div className="text-sm opacity-90">Countries</div>
              </div>
              <div className="bg-gradient-to-br from-[#F97316] to-[#FBBF24] p-8 rounded-lg text-white">
                <div className="text-5xl mb-3" style={{fontWeight: 800}}>100+</div>
                <div className="text-sm opacity-90">Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To eliminate the stress and uncertainty from international relocation, empowering our people to pursue global opportunities with confidence.",
                gradient: "from-[#6366F1] to-[#8B5CF6]"
              },
              {
                icon: Globe2,
                title: "Our Vision",
                desc: "A world where borders don't limit potential—where anyone can live, work, and thrive anywhere they choose.",
                gradient: "from-[#8B5CF6] to-[#F97316]"
              },
              {
                icon: Heart,
                title: "Our Values",
                desc: "Excellence, transparency, empathy, and relentless commitment to our clients' success. Always.",
                gradient: "from-[#F97316] to-[#FBBF24]"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-lg">
                <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 700}}>{item.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 800}}>
              What Makes ACG Different
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              We're not just another relocation company. Here's what sets us apart:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Shield,
                title: "Legal Expertise Meets Personal Touch",
                desc: "Our team includes licensed attorneys, investors, property developers, Moms, Dads, and Grandparents, but we deliver service with the warmth of a trusted friend. You get legal precision with human empathy.",
                color: "text-[#6366F1]"
              },
              {
                icon: Zap,
                title: "Speed Without Compromise",
                desc: "We move fast, but never cut corners. Our proprietary systems accelerate timelines while maintaining 100% compliance and accuracy.",
                color: "text-[#8B5CF6]"
              },
              {
                icon: Globe2,
                title: "True Global Network",
                desc: "Based in Ghana with hubs in Dubai and Lisbon, plus partners in 5 countries. Local knowledge everywhere. We're not outsourcing—we're locals helping locals.",
                color: "text-[#C026D3]"
              },
              {
                icon: TrendingUp,
                title: "Beyond Relocation",
                desc: "We don't just get you there; we help you thrive. Career coaching, networking, cultural integration—we're invested in your long-term success.",
                color: "text-[#F97316]"
              },
              {
                icon: Users,
                title: "Personalized, Not Templated",
                desc: "Every move is unique. We design custom solutions, not cookie-cutter packages. Your dedicated manager knows your story.",
                color: "text-[#FB923C]"
              },
              {
                icon: Award,
                title: "Proven Track Record",
                desc: "98% client satisfaction rate. 50+ successful moves.",
                color: "text-[#FBBF24]"
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 bg-gray-50 p-6 rounded-lg">
                <div className={`${item.color} flex-shrink-0`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl text-[#1E1B4B] mb-2" style={{fontWeight: 700}}>{item.title}</h3>
                  <p className="text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-24 bg-gradient-to-r from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6 tracking-tight" style={{fontWeight: 800}}>
              Our Team: Global Citizens
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Every member of our team has lived abroad. We've walked in your shoes. We understand the excitement, the fear, the uncertainty—and we know how to navigate it all.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  stat: "15+",
                  label: "Languages Spoken",
                  desc: "We communicate in your language"
                },
                {
                  stat: "10+",
                  label: "Nationalities",
                  desc: "Diverse perspectives, unified mission"
                },
                {
                  stat: "100%",
                  label: "Have Relocated",
                  desc: "We've been where you are"
                }
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-4xl md:text-5xl text-[#F97316] mb-2" style={{fontWeight: 800}}>{item.stat}</div>
                  <div className="text-white mb-2" style={{fontWeight: 700}}>{item.label}</div>
                  <div className="text-sm text-white/70">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl text-[#1E1B4B] mb-6 tracking-tight" style={{fontWeight: 800}}>
            Join Our Community of Success Stories
          </h2>
          <p className="text-xl text-[#64748B] mb-10 max-w-2xl mx-auto">
            Experience the ACG difference. Book your free consultation and discover how we can make your global move seamless.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-12 py-5 hover:shadow-2xl transition-all hover:scale-105"
            style={{fontWeight: 700}}
          >
            START YOUR JOURNEY NOW →
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
