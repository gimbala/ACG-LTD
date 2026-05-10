import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getSupabase } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/lib/supabase-config';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentLocation: '',
    destinationCountry: '',
    timeline: '',
    relocationType: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (isSupabaseConfigured()) {
      const sb = getSupabase();
      if (!sb) {
        setSubmitError('Unable to connect to the server. Please try again.');
        return;
      }
      setSubmitting(true);
      const { data: inserted, error } = await sb
        .from('consultation_requests')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          current_location: formData.currentLocation,
          destination_country: formData.destinationCountry,
          timeline: formData.timeline,
          relocation_type: formData.relocationType,
          message: formData.message || null,
        })
        .select('id')
        .single();

      if (error || !inserted?.id) {
        setSubmitting(false);
        setSubmitError(error?.message ?? 'Could not save your request.');
        return;
      }

      const { error: emailError } = await sb.functions.invoke(
        'send-booking-confirmation',
        {
          body: { consultation_id: inserted.id },
        }
      );

      setSubmitting(false);

      if (emailError) {
        console.warn('Confirmation email could not be sent:', emailError.message);
      }
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact ACG | Free Relocation Consultation | Ghana"
        description="Book your free 30-minute consultation with ACG. Get expert guidance on visa, immigration, and relocation from Ghana. Response within 24 hours. Email: hello@acghana.com"
        keywords="contact ACG Ghana, free relocation consultation, Ghana immigration consultation, visa consultation Ghana, relocation quote Ghana"
        canonical="https://acghana.com/contact"
      />
      <Navigation currentPage="contact" onNavigate={onNavigate} />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-1 h-32 bg-white rotate-45"></div>
          <div className="absolute bottom-10 left-10 w-1 h-40 bg-white -rotate-45"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl mb-6 tracking-tight" style={{fontWeight: 800}}>
              Let's Start Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">Global Journey</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Book your free 30-minute consultation. No pressure, just expert guidance tailored to your unique situation.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F97316]" />
                <span className="text-white/80">Free 30-min consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F97316]" />
                <span className="text-white/80">No commitment required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F97316]" />
                <span className="text-white/80">Response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl text-[#1E1B4B] mb-2 tracking-tight" style={{fontWeight: 800}}>
                  Book Your Free Consultation
                </h2>
                <p className="text-[#64748B] mb-8">
                  Fill out the form below and we'll get back to you within 24 hours to schedule your consultation.
                </p>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded mb-6 text-sm">
                    {submitError}
                  </div>
                )}

                {submitted && (
                  <div className="bg-gradient-to-r from-[#6366F1]/10 to-[#F97316]/10 border-l-4 border-[#6366F1] p-6 rounded mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-[#6366F1]" />
                      <div>
                        <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 700}}>Thank you! We've received your request.</h4>
                        <p className="text-sm text-[#64748B]">Our team will contact you within 24 hours to schedule your free consultation.</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                        placeholder="+1 (234) 567-8900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>Current Location *</label>
                      <input
                        type="text"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                        placeholder="New York, USA"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>Destination Country *</label>
                      <input
                        type="text"
                        name="destinationCountry"
                        value={formData.destinationCountry}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                        placeholder="Singapore"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>Timeline *</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP (within 1 month)</option>
                        <option value="1-3months">1-3 months</option>
                        <option value="3-6months">3-6 months</option>
                        <option value="6-12months">6-12 months</option>
                        <option value="exploring">Just exploring</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>Relocation Type *</label>
                      <select
                        name="relocationType"
                        value={formData.relocationType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                      >
                        <option value="">Select type</option>
                        <option value="work">Work/Employment</option>
                        <option value="family">Family/Personal</option>
                        <option value="study">Study/Education</option>
                        <option value="business">Business/Investment</option>
                        <option value="retirement">Retirement</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>Tell Us About Your Situation</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none"
                      placeholder="Share any specific questions or concerns you have about your relocation..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white px-8 py-4 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
                    style={{fontWeight: 700}}
                  >
                    <Send className="w-5 h-5" />
                    {submitting ? 'SENDING…' : 'SUBMIT REQUEST'}
                  </button>

                  <p className="text-xs text-[#64748B] text-center">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service. We'll never share your information.
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl text-[#1E1B4B] mb-6" style={{fontWeight: 700}}>Other Ways to Reach Us</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 600}}>Email</h4>
                      <a href="mailto:hello@acghana.com" className="text-[#64748B] hover:text-[#6366F1] text-sm">
                        hello@acghana.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#F97316] rounded flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 600}}>Phone</h4>
                      <a href="tel:+233538924044" className="text-[#64748B] hover:text-[#6366F1] text-sm">
                        +(233) 538-924-044
                      </a>
                      <p className="text-xs text-[#64748B] mt-1">Mon-Fri, 9am-4pm GMT</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#FBBF24] rounded flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 600}}>Headquarters</h4>
                      <p className="text-[#64748B] text-sm">
                        Accra, Ghana<br />
                        
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#F97316] rounded flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-[#1E1B4B] mb-1" style={{fontWeight: 600}}>Business Hours</h4>
                      <p className="text-[#64748B] text-sm">
                        Mon-Fri: 9am - 4pm GMT<br />
                        Weekend: By appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-[#6366F1] to-[#F97316] rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5" />
                  <h3 style={{fontWeight: 700}}>Why Book Now?</h3>
                </div>
                <ul className="space-y-3 text-sm text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Limited slots available this month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Early birds get priority processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>Free market insights & timeline estimate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>No obligation, just expert guidance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl text-[#1E1B4B] mb-4 tracking-tight" style={{fontWeight: 800}}>
              Global Presence
            </h2>
            <p className="text-[#64748B] text-lg">
              Headquartered in Ghana with strategic hubs across continents.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              "🇺🇸 United States",
              "🇬🇭 Ghana",
              "🇵🇹 Portugal",
              "🇦🇪 UAE"
            ].map((location, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg text-[#64748B]">
                {location}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
