import { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Lock, User, Mail, Key, FileText, Upload, CheckCircle2, Clock, AlertCircle, Download, Settings, LogOut, Home, Briefcase, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchProfile, loadPortalCase } from '@/lib/supabase-data';
import { getSupabase } from '@/lib/supabase';
import { isSupabaseConfigured } from '@/lib/supabase-config';

type Page = 'home' | 'services' | 'process' | 'about' | 'contact' | 'portal' | 'admin' | 'logos';

interface ClientPortalPageProps {
  onNavigate: (page: Page) => void;
}

export function ClientPortalPage({ onNavigate }: ClientPortalPageProps) {
  const { session, profile, signIn, signOut } = useAuth();
  const [demoLoggedIn, setDemoLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'documents'>('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalBundle, setPortalBundle] = useState<Awaited<
    ReturnType<typeof loadPortalCase>
  > | null>(null);

  const useCloudAuth = isSupabaseConfigured();
  const isPortalLoggedIn = useCloudAuth
    ? Boolean(session?.user && profile?.role === 'client')
    : demoLoggedIn;

  useEffect(() => {
    if (!useCloudAuth || !session?.user || profile?.role !== 'client') {
      setPortalBundle(null);
      return;
    }
    let cancelled = false;
    setPortalLoading(true);
    void loadPortalCase(session.user.id).then((data) => {
      if (!cancelled) {
        setPortalBundle(data);
        setPortalLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [useCloudAuth, session?.user?.id, profile?.role]);

  // Mock client data (fallback when Supabase is off or no case row yet)
  const mockClientData = {
    name: 'John Mensah',
    email: 'john.mensah@email.com',
    phone: '+233 24 123 4567',
    currentLocation: 'Accra, Ghana',
    destination: 'Toronto, Canada',
    service: 'Complete Package',
    startDate: '2024-01-15',
    caseManager: 'Sarah Johnson'
  };

  const mockMilestones = [
    { id: 1, title: 'Initial Consultation', status: 'completed', date: '2024-01-15', description: 'Welcome call and needs assessment' },
    { id: 2, title: 'Document Collection', status: 'completed', date: '2024-01-20', description: 'Passport, certificates, and supporting docs' },
    { id: 3, title: 'Visa Application Prep', status: 'in-progress', date: '2024-02-01', description: 'Application forms and legal review' },
    { id: 4, title: 'Visa Submission', status: 'pending', date: 'TBD', description: 'Submit to immigration authorities' },
    { id: 5, title: 'Home Search', status: 'pending', date: 'TBD', description: 'Virtual and in-person property tours' },
    { id: 6, title: 'Pre-Arrival Planning', status: 'pending', date: 'TBD', description: 'School selection, banking setup' },
  ];

  const mockDocuments = [
    { id: 1, name: 'Passport Copy', uploadedBy: 'Client', date: '2024-01-16', status: 'approved' },
    { id: 2, name: 'Birth Certificate', uploadedBy: 'Client', date: '2024-01-16', status: 'approved' },
    { id: 3, name: 'Employment Letter', uploadedBy: 'Client', date: '2024-01-18', status: 'pending' },
    { id: 4, name: 'Visa Application Form', uploadedBy: 'ACG Team', date: '2024-01-22', status: 'approved' },
  ];

  const clientData =
    !useCloudAuth
      ? mockClientData
      : portalBundle
        ? portalBundle.clientData
        : profile?.role === 'client'
          ? {
              name: profile.full_name ?? profile.email?.split('@')[0] ?? 'Client',
              email: profile.email ?? '',
              phone: profile.phone ?? '',
              currentLocation: '—',
              destination: '—',
              service: 'Assigned package',
              startDate: '',
              caseManager: 'ACG Team',
            }
          : mockClientData;

  const milestones = !useCloudAuth
    ? mockMilestones
    : portalLoading
      ? []
      : portalBundle
        ? portalBundle.milestones
        : [];

  const documents = !useCloudAuth
    ? mockDocuments
    : portalLoading
      ? []
      : portalBundle
        ? portalBundle.documents
        : [];

  const completedMilestones = milestones.filter((m) => m.status === 'completed').length;
  const journeyProgressPct =
    milestones.length > 0 ? Math.round((completedMilestones / milestones.length) * 100) : 0;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (useCloudAuth) {
      const { error } = await signIn(email, password);
      if (error) {
        setAuthError(error.message);
        return;
      }
      const sb = getSupabase();
      const { data: userData } = sb ? await sb.auth.getUser() : { data: { user: null } };
      const uid = userData.user?.id;
      if (!uid) return;
      const p = await fetchProfile(uid);
      if (p?.role === 'admin') {
        await signOut();
        setAuthError('Admin accounts should use the Admin Dashboard to sign in.');
        return;
      }
      return;
    }

    if (email && password) {
      setDemoLoggedIn(true);
    }
  };

  const handleLogout = async () => {
    setAuthError(null);
    if (useCloudAuth) {
      await signOut();
    } else {
      setDemoLoggedIn(false);
    }
    setEmail('');
    setPassword('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-[#F97316]" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (!isPortalLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation currentPage="portal" onNavigate={onNavigate} />

        {/* Login Hero */}
        <section className="relative bg-gradient-to-br from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl mb-4 tracking-tight" style={{fontWeight: 800}}>
                  Client Portal
                </h1>
                <p className="text-xl text-white/90">
                  Track your relocation journey in real-time
                </p>
              </div>

              {/* Login Form */}
              <div className="bg-white rounded-lg shadow-2xl p-8">
                {authError && (
                  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {authError}
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>
                      Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6366F1] focus:border-transparent outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-[#6366F1] rounded" />
                      <span className="text-[#64748B]">Remember me</span>
                    </label>
                    <a href="#" className="text-[#6366F1] hover:text-[#F97316]" style={{fontWeight: 600}}>
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#6366F1] to-[#F97316] text-white py-4 rounded-lg hover:shadow-lg transition-all"
                    style={{fontWeight: 700}}
                  >
                    Sign In to Portal
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-[#64748B]">
                    Don't have an account?{' '}
                    <button
                      onClick={() => onNavigate('contact')}
                      className="text-[#6366F1] hover:text-[#F97316]"
                      style={{fontWeight: 600}}
                    >
                      Contact us to get started
                    </button>
                  </p>
                </div>
              </div>

              {/* Demo Note */}
              {!useCloudAuth && (
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <p className="text-sm text-white/80">
                    <strong>Demo:</strong> Enter any email and password to view the portal
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage="portal" onNavigate={onNavigate} />

      {/* Portal Header */}
      <section className="bg-gradient-to-r from-[#1E1B4B] via-[#6366F1] to-[#F97316] text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2" style={{fontWeight: 800}}>
                Welcome back, {clientData.name.split(' ')[0]}!
              </h1>
              <p className="text-white/80">
                Case ID: ACG-2024-001234 • Manager: {clientData.caseManager}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors"
              style={{fontWeight: 600}}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-gray-600 hover:text-[#6366F1]'
              }`}
              style={{fontWeight: 600}}
            >
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Dashboard
              </div>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-gray-600 hover:text-[#6366F1]'
              }`}
              style={{fontWeight: 600}}
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile
              </div>
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'documents'
                  ? 'border-[#6366F1] text-[#6366F1]'
                  : 'border-transparent text-gray-600 hover:text-[#6366F1]'
              }`}
              style={{fontWeight: 600}}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            {useCloudAuth && portalLoading && (
              <p className="mb-8 text-center text-[#64748B]">Loading your case…</p>
            )}
            {useCloudAuth &&
              !portalLoading &&
              profile?.role === 'client' &&
              !portalBundle && (
                <div className="mb-8 rounded-lg border border-[#6366F1]/30 bg-[#6366F1]/5 p-6 text-center text-[#1E1B4B]">
                  <p className="font-semibold">Your portal is active</p>
                  <p className="mt-2 text-sm text-[#64748B]">
                    Your relocation timeline and documents will appear here once your case is linked to this
                    account.
                  </p>
                </div>
              )}
            {/* Service Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#6366F1]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#64748B]">Service Package</p>
                    <p className="text-xl text-[#1E1B4B]" style={{fontWeight: 700}}>{clientData.service}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#F97316]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#FBBF24] rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#64748B]">Progress</p>
                    <p className="text-xl text-[#1E1B4B]" style={{fontWeight: 700}}>
                      {milestones.length ? `${journeyProgressPct}% Complete` : '—'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[#64748B]">Tasks Completed</p>
                    <p className="text-xl text-[#1E1B4B]" style={{fontWeight: 700}}>
                      {milestones.length
                        ? `${completedMilestones} of ${milestones.length}`
                        : '—'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl text-[#1E1B4B] mb-6" style={{fontWeight: 800}}>
                Your Relocation Journey
              </h2>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      {getStatusIcon(milestone.status)}
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-16 bg-gray-200 my-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg text-[#1E1B4B]" style={{fontWeight: 700}}>
                          {milestone.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(milestone.status)}`} style={{fontWeight: 600}}>
                          {milestone.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[#64748B] mb-2">{milestone.description}</p>
                      <p className="text-sm text-[#64748B]">
                        <strong>Date:</strong> {milestone.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl text-[#1E1B4B]" style={{fontWeight: 800}}>
                  Profile Information
                </h2>
                <button className="flex items-center gap-2 text-[#6366F1] hover:text-[#F97316]" style={{fontWeight: 600}}>
                  <Settings className="w-5 h-5" />
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                    Full Name
                  </label>
                  <p className="text-[#1E1B4B] text-lg">{clientData.name}</p>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                    Email
                  </label>
                  <p className="text-[#1E1B4B] text-lg">{clientData.email}</p>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                    Phone
                  </label>
                  <p className="text-[#1E1B4B] text-lg">{clientData.phone}</p>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                    Current Location
                  </label>
                  <p className="text-[#1E1B4B] text-lg">{clientData.currentLocation}</p>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                    Destination
                  </label>
                  <p className="text-[#1E1B4B] text-lg">{clientData.destination}</p>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                    Start Date
                  </label>
                  <p className="text-[#1E1B4B] text-lg">{clientData.startDate}</p>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                    Service Package
                  </label>
                  <p className="text-[#1E1B4B] text-lg">{clientData.service}</p>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2" style={{fontWeight: 600}}>
                    Case Manager
                  </label>
                  <p className="text-[#1E1B4B] text-lg">{clientData.caseManager}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl text-[#1E1B4B] mb-6" style={{fontWeight: 800}}>
                Upload Documents
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#6366F1] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-[#1E1B4B] mb-2" style={{fontWeight: 600}}>
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-[#64748B]">
                  Supported formats: PDF, JPG, PNG (Max 10MB)
                </p>
              </div>
            </div>

            {/* Documents List */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl text-[#1E1B4B] mb-6" style={{fontWeight: 800}}>
                Your Documents
              </h2>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#6366F1] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#6366F1]" />
                      </div>
                      <div>
                        <p className="text-[#1E1B4B]" style={{fontWeight: 600}}>{doc.name}</p>
                        <p className="text-sm text-[#64748B]">
                          Uploaded by {doc.uploadedBy} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        doc.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`} style={{fontWeight: 600}}>
                        {doc.status.toUpperCase()}
                      </span>
                      <button className="text-[#6366F1] hover:text-[#F97316]">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
