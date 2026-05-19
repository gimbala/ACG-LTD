import { useEffect, useRef, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { BookingSuccessNotice } from '@/components/BookingSuccessNotice';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Calendar } from 'lucide-react';
import { SEO } from '../components/SEO';
import { getSupabase } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/lib/supabase-config';
import { SITE_ORIGIN } from '@/lib/site';
import { btnPrimary, inputField } from '@/lib/ui-classes';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  currentLocation: '',
  destinationCountry: '',
  timeline: '',
  relocationType: '',
  message: '',
};

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const showSuccess = () => {
    setFormData(EMPTY_FORM);
    setSubmitted(true);
    setSubmitError(null);
    requestAnimationFrame(() => {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitted(false);

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

      const { error: emailError } = await sb.functions.invoke('send-booking-confirmation', {
        body: { consultation_id: inserted.id },
      });

      setSubmitting(false);

      if (emailError) {
        console.warn('Confirmation email could not be sent:', emailError.message);
      }
    } else {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 400));
      setSubmitting(false);
    }

    showSuccess();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!submitted) return;
    const t = window.setTimeout(() => setSubmitted(false), 12000);
    return () => window.clearTimeout(t);
  }, [submitted]);

  return (
    <div className={`min-h-screen bg-white ${submitted ? 'pb-36 md:pb-0' : ''}`}>
      <SEO
        title="Contact ACG | Free Relocation Consultation | Ghana"
        description="Book your free 30-minute consultation with ACG. Get expert guidance on visa, immigration, and relocation from Ghana. Response within 24 hours. Email: hello@acghana.com"
        keywords="contact ACG Ghana, free relocation consultation, Ghana immigration consultation, visa consultation Ghana, relocation quote Ghana"
        canonical={`${SITE_ORIGIN}/contact`}
      />
      <Navigation currentPage="contact" onNavigate={onNavigate} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E1B4B] via-[#6366F1] to-[#F97316] py-12 text-white sm:py-16 md:py-20">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 h-32 w-1 rotate-45 bg-white"></div>
          <div className="absolute bottom-10 left-10 h-40 w-1 -rotate-45 bg-white" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1
              className="mb-4 text-3xl tracking-tight sm:mb-6 sm:text-5xl md:text-6xl"
              style={{ fontWeight: 800 }}
            >
              Let&apos;s Start Your
              <br />
              <span className="bg-gradient-to-r from-[#F97316] to-[#FBBF24] bg-clip-text text-transparent">
                Global Journey
              </span>
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-white/90 sm:mb-8 sm:text-xl">
              Book your free 30-minute consultation. No pressure, just expert guidance tailored to your
              unique situation.
            </p>
            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F97316]" aria-hidden />
                <span className="text-white/80">Free 30-min consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F97316]" aria-hidden />
                <span className="text-white/80">No commitment required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#F97316]" aria-hidden />
                <span className="text-white/80">Response within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-gray-50 py-10 sm:py-16 md:py-20" id="booking-form">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="rounded-lg bg-white p-5 shadow-lg sm:p-8">
                <h2
                  className="mb-2 text-2xl tracking-tight text-[#1E1B4B] sm:text-3xl"
                  style={{ fontWeight: 800 }}
                >
                  Book Your Free Consultation
                </h2>
                <p className="mb-6 text-[#64748B] sm:mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours to schedule your
                  consultation.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate={false}>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label htmlFor="firstName" className="mb-2 block text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={inputField}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-2 block text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={inputField}
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        inputMode="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputField}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputField}
                        placeholder="+233 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label
                        htmlFor="currentLocation"
                        className="mb-2 block text-[#1E1B4B]"
                        style={{ fontWeight: 600 }}
                      >
                        Current Location *
                      </label>
                      <input
                        id="currentLocation"
                        type="text"
                        name="currentLocation"
                        autoComplete="address-level2"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        required
                        className={inputField}
                        placeholder="Accra, Ghana"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="destinationCountry"
                        className="mb-2 block text-[#1E1B4B]"
                        style={{ fontWeight: 600 }}
                      >
                        Destination Country *
                      </label>
                      <input
                        id="destinationCountry"
                        type="text"
                        name="destinationCountry"
                        value={formData.destinationCountry}
                        onChange={handleChange}
                        required
                        className={inputField}
                        placeholder="Canada"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label htmlFor="timeline" className="mb-2 block text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                        Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className={inputField}
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
                      <label
                        htmlFor="relocationType"
                        className="mb-2 block text-[#1E1B4B]"
                        style={{ fontWeight: 600 }}
                      >
                        Relocation Type *
                      </label>
                      <select
                        id="relocationType"
                        name="relocationType"
                        value={formData.relocationType}
                        onChange={handleChange}
                        required
                        className={inputField}
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
                    <label htmlFor="message" className="mb-2 block text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                      Tell Us About Your Situation
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`${inputField} resize-none`}
                      placeholder="Share any specific questions or concerns..."
                    />
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                    >
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${btnPrimary} w-full py-4 text-base sm:text-lg`}
                    aria-busy={submitting}
                  >
                    <Send className="h-5 w-5" aria-hidden />
                    {submitting ? 'Submitting…' : 'Submit request'}
                  </button>

                  {submitted && (
                    <div ref={successRef} tabIndex={-1} className="outline-none">
                      <BookingSuccessNotice />
                    </div>
                  )}

                  <p className="text-center text-xs text-[#64748B]">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="rounded-lg bg-white p-5 shadow-lg sm:p-6">
                <h3 className="mb-6 text-xl text-[#1E1B4B]" style={{ fontWeight: 700 }}>
                  Other Ways to Reach Us
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#6366F1] to-[#8B5CF6]">
                      <Mail className="h-6 w-6 text-white" aria-hidden />
                    </div>
                    <div>
                      <h4 className="mb-1 text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                        Email
                      </h4>
                      <a
                        href="mailto:hello@acghana.com"
                        className="text-sm text-[#64748B] underline-offset-2 hover:text-[#6366F1] hover:underline"
                      >
                        hello@acghana.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#8B5CF6] to-[#F97316]">
                      <Phone className="h-6 w-6 text-white" aria-hidden />
                    </div>
                    <div>
                      <h4 className="mb-1 text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                        Phone
                      </h4>
                      <a
                        href="tel:+233538924044"
                        className="text-sm text-[#64748B] underline-offset-2 hover:text-[#6366F1] hover:underline"
                      >
                        +(233) 538-924-044
                      </a>
                      <p className="mt-1 text-xs text-[#64748B]">Mon-Fri, 9am-4pm GMT</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#F97316] to-[#FBBF24]">
                      <MapPin className="h-6 w-6 text-white" aria-hidden />
                    </div>
                    <div>
                      <h4 className="mb-1 text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                        Headquarters
                      </h4>
                      <p className="text-sm text-[#64748B]">Accra, Ghana</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gradient-to-br from-[#6366F1] to-[#F97316]">
                      <Clock className="h-6 w-6 text-white" aria-hidden />
                    </div>
                    <div>
                      <h4 className="mb-1 text-[#1E1B4B]" style={{ fontWeight: 600 }}>
                        Business Hours
                      </h4>
                      <p className="text-sm text-[#64748B]">
                        Mon-Fri: 9am - 4pm GMT
                        <br />
                        Weekend: By appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-[#6366F1] to-[#F97316] p-5 text-white sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" aria-hidden />
                  <h3 style={{ fontWeight: 700 }}>Why Book Now?</h3>
                </div>
                <ul className="space-y-3 text-sm text-white/90">
                  {[
                    'Limited slots available this month',
                    'Early birds get priority processing',
                    'Free market insights & timeline estimate',
                    'No obligation, just expert guidance',
                  ].map((text) => (
                    <li key={text} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile sticky success — visible after submit without scrolling back up */}
      {submitted && (
        <div
          className="fixed inset-x-0 bottom-0 z-50 border-t border-green-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md md:hidden pb-[max(1rem,env(safe-area-inset-bottom))]"
          role="status"
          aria-live="polite"
        >
          <BookingSuccessNotice compact onDismiss={() => setSubmitted(false)} />
        </div>
      )}

      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-12">
            <h2
              className="mb-4 text-3xl tracking-tight text-[#1E1B4B] sm:text-4xl md:text-5xl"
              style={{ fontWeight: 800 }}
            >
              Global Presence
            </h2>
            <p className="text-lg text-[#64748B]">Headquartered in Ghana with strategic hubs across continents.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center sm:gap-6 md:grid-cols-4">
            {['🇺🇸 United States', '🇬🇭 Ghana', '🇵🇹 Portugal', '🇦🇪 UAE'].map((location) => (
              <div key={location} className="rounded-lg bg-gray-50 p-4 text-sm text-[#64748B] sm:text-base">
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
